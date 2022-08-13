import { action, createStore } from "easy-peasy";

const projectModel = {
  projects: [],
  addProject: action((state, payload) => {
    state.projects.push(payload);
  }),
  deleteProject: action((state, payload) => {
    state.projects = state.projects.filter((item) => item.id !== payload);
  }),
  editData: {},
  isUpdate: false,
  getEditData: action((state, payload) => {
    state.editData = payload;
    state.isUpdate = true;
  }),
  updateProject: action((state, payload) => {
    state.projects = state.projects.map((item) => {
      if (item.id === payload.id) {
        return { ...payload };
      }
      return item;
    });
    state.isUpdate = false;
    state.editData = {};
  }),
};

const taskModel = {
  tasks: [],
  addTask: action((state, payload) => {
    state.tasks.push(payload);
  }),
  deleteTask: action((state, payload) => {
    state.tasks = state.tasks.filter((item) => item.id !== payload);
  }),
  editData: {},
  isUpdate: false,
  getEditData: action((state, payload) => {
    state.editData = payload;
    state.isUpdate = true;
  }),
  updateTask: action((state, payload) => {
    state.tasks = state.tasks.map((item) => {
      if (item.id === payload.id) {
        return { ...payload };
      }
      return item;
    });
    state.isUpdate = false;
    state.editData = {};
  }),
  statusUpdate: action((state, payload) => {
    state.tasks = state.tasks.map((item) => {
      if (item.id === payload.id) {
        return { ...item, status: payload.status };
      }
      return item;
    });
  }),
  subTasks: [],
  addSubTask: action((state, payload) => {
    state.subTasks.push(payload);
  }),
  deleteSubTask: action((state, paylaod) => {
    state.subTasks = state.subTasks.filter((item) => item.id !== paylaod);
  }),
  updateSubTaskStatus: action((state, payload) => {
    state.subTasks = state.subTasks.map((item) => {
      if (item.id === payload.id) {
        return { ...item, status: payload.status };
      }
      return item;
    });
  }),
};

const displayModal = {
  display: false,
  openModal: action((state) => {
    state.display = true;
  }),
  closeModal: action((state) => {
    state.display = false;
  }),
};

const store = createStore({
  project: { ...projectModel },
  task: { ...taskModel },
  modal: { ...displayModal },
});

export default store;

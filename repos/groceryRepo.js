let fs = require("fs");

const FILE_NAME = "./assets/grocerie.json";

let groceryRepo = {
  get: (resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: (id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let item = JSON.parse(data).find((p) => p.id == id);
        resolve(item);
      }
    });
  },
  insert: (newData, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let items = JSON.parse(data);
        items.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(items), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: (newData, id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let items = JSON.parse(data);
        items = items.map((p) => (p.id == id ? { ...p, ...newData } : p));
        fs.writeFile(FILE_NAME, JSON.stringify(items), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  delete: (id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let items = JSON.parse(data);
        items = items.filter((p) => p.id != id);
        fs.writeFile(FILE_NAME, JSON.stringify(items), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(id);
          }
        });
      }
    });
  },
};

module.exports = groceryRepo;

let inventory = {
  lastId: 0,
  collection: [],
  setDate() {
    let date = new Date();
    document.querySelector("#order_date").textContent = date.toUTCString();
  },

  cacheTemplate() {
    let templateEl = document.querySelector("#inventory_item");
    this.template = Handlebars.compile(templateEl.innerHTML);
    templateEl.remove();
  },

  add() {
    this.lastId += 1;
    let item = {
      id: this.lastId,
      name: "",
      stock_number: "",
      quantity: 1
    };
    this.collection.push(item);

    return item;
  },

  remove(idx) {
    this.collection = this.collection.filter(function (item) {
      return item.id !== idx;
    });
  },

  get(id) {
    let foundItem;

    this.collection.forEach(function (item) {
      if (item.id === id) {
        foundItem = item;
        return false;
      }
    });

    return foundItem;
  },

  update(itemRow) {
    let id = this.findID(itemRow);
    let item = this.get(id);

    item.name = itemRow.querySelector("[name^=item_name]").value;
    item.stock_number = itemRow.querySelector("[name^=item_stock_number]").value;
    item.quantity = itemRow.querySelector("[name^=item_quantity]").value;
  },

  newItem(e) {
    e.preventDefault();
    let item = this.add();
    document.querySelector("#inventory").innerHTML += this.template({ id: item.id });
  },

  findParent(e) {
    return e.target.closest("tr");
  },

  findID(item) {
    return Number(item.querySelector("input[type=hidden]").value);
  },

  deleteItem(e) {
    e.preventDefault();
    let item = this.findParent(e);
    this.remove(this.findID(item));
    item.remove();
  },

  updateItem(e) {
    let item = this.findParent(e);
    this.update(item);
  },

  bindEvents() {
    document.querySelector("#add_item").addEventListener('click', this.newItem.bind(this));
    document.querySelector("#inventory").addEventListener("click", (event) => {
      if (event.target.closest("a.delete")) this.deleteItem.call(this, event);
    });
    document.querySelector("#inventory").addEventListener("focusout", (event) => {
      if (event.target.closest('input')) this.updateItem.call(this, event);
    });
  },

  init() {
    this.setDate();
    this.cacheTemplate();
    this.bindEvents();
  }
};

document.addEventListener('DOMContentLoaded', inventory.init.bind(inventory));

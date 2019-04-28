import { v4 as uuid } from "uuid";
import moment = require("moment");

import { IEvent } from "../models/event";
import { IEventRepository } from "./event-repository";
import { IProduct } from "./../models/product";

const events: IEvent[] = [
  {
    id: "c64b1314-64ab-4fcf-99a1-df9edd1307ce",
    name: "Tortas para la oficina 1",
    expirationDate: 1549000000, // epoch
    endHour: 1200,
    createdBy: "90ec45da-452b-4c37-a5fc-482c8bc92895",
    total: 22,
    cancelled: false,
    markedAsFinished: false,
    createdAt: 1548000000,
    updatedAt: 1548000000,
    orders: [],
    products: [
      {
        id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
        name: "Poc Chuc Torta",
        price: 25,
        createdAt: 1548000000,
        updatedAt: 1548000000
      }
    ]
  },
  {
    id: "8022f792-40cf-43ef-b72d-ba42de2117d3",
    name: "Tortas para la oficina 2",
    expirationDate: 1549500000, // epoch
    endHour: 1200,
    createdBy: "a79639e6-3ed9-467c-b9c5-1e60908d812c",
    total: 10,
    cancelled: true,
    markedAsFinished: true,
    createdAt: 1548000000,
    updatedAt: 1548000000,
    orders: [],
    products: [
      {
        id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
        name: "Poc Chuc Torta",
        price: 25,
        createdAt: 1548000000,
        updatedAt: 1548000000
      }
    ]
  },
  {
    id: "8c9ae830-dd56-4828-8503-c70355253de9",
    name: "Tortas para la oficina 3",
    expirationDate: 1586476800, // epoch
    endHour: 1200,
    createdBy: "6d623d08-113c-4565-81b2-e17c90331241",
    total: 20,
    cancelled: false,
    markedAsFinished: false,
    createdAt: 1548000000,
    updatedAt: 1548000000,
    orders: [],
    products: [
      {
        id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
        name: "Poc Chuc Torta",
        price: 25,
        createdAt: 1548000000,
        updatedAt: 1548000000
      }
    ]
  }
];

const find = (query?: any): Promise<IEvent[]> => {
  if (query) {
    const [key]: string[] = Object.keys(query);
    return Promise.resolve(
      events.filter((order: IEvent) => order[key] === query[key])
    );
  }
  return Promise.resolve(events);
};

const save = (event: IEvent): Promise<IEvent> => {
  event.id = uuid();
  event.products.map((product: IProduct) => (product.id = uuid()));
  const result: IEvent = {
    ...event,
    orders: [],
    total: 0,
    markedAsFinished: false,
    cancelled: false,
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  };
  events.push(result);
  return Promise.resolve(result);
};

const update = (event: IEvent): Promise<IEvent> => {
  const index: number = events.findIndex(
    (even: IEvent) => even.id === event.id
  );
  events[index] = {
    ...event,
    updatedAt: moment()
      .utc()
      .unix()
  };
  return Promise.resolve(events[index]);
};

export const eventMemoryRepository: IEventRepository = { find, save, update };

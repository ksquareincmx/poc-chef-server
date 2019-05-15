import chalk from "chalk";
import * as Debug from "debug";

import { IEvent } from "../../common/models/event";
import { eventService } from "../services";

const debug = Debug("chef:events:controller:events");

const eventStrategy = (
  eventService: any,
  query: string = ""
): Promise<IEvent[]> => {
  switch (query) {
    case "current": {
      return eventService.getCurrentEvents();
    }
    case "past": {
      return eventService.getPastEvents();
    }
    case "all": {
      return eventService.getEvents();
    }
    default: {
      return eventService.getCurrentEvents();
    }
  }
};

const getEventById = async (id: string): Promise<IEvent> => {
  debug(`EventController: ${chalk.green("getting event")}`);
  return eventService.getEventById(id);
};

const getEvents = async (type: string): Promise<IEvent[]> => {
  debug(`EventController: ${chalk.green("getting events")}`);
  return eventStrategy(eventService, type);
};

export const eventController = {
  getEvents,
  getEventById
};

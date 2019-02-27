import { eventController } from "../../controllers/event";
import { validation } from "../../middlewares/validationHandler";
import { eventIdSchema, createEventSchema } from "../../utils/schemas/event";

export const eventRoutes = (app: any) => {
  /**
   * @api        {get}  /v1/events?type=:type Get all events
   * @apiGroup   Events
   *
   * @apiParam   {string}   type   event type (past | current)
   *
   * @apiSuccess {Object[]} event                               events collection
   * @apiSuccess {string}   event.id                            event id
   * @apiSuccess {string}   event.name                          event name
   * @apiSuccess {number}   event.start_date                    event start date epoch
   * @apiSuccess {number}   event.end_date                      event end date epoch
   * @apiSuccess {number}   event.poc_chuc_torta_unit_price  event Poc Chuc torta price
   * @apiSuccess {number}   event.poc_chuc_torta_amount         event Poc Chuc torta amount
   * @apiSuccess {number}   event.shrimp_torta_unit_price    event shrimp torta price
   * @apiSuccess {number}   event.shrimp_torta_amount           event shrimp torta amount
   * @apiSuccess {number}   event.total                         event total price
   *
   * @apiSuccessExample {json} Success
   * HTTP 1.1 200 Ok
   * {
   *  "events": [
   *     {
   *       "id": "1",
   *       "name": "Tortas para la oficina",
   *       "start_date": 10000,
   *       "end_date": 20000,
   *       "poc_chuc_torta_unit_price": 10,
   *       "poc_chuc_torta_amount": 1,
   *       "shrimp_torta_unit_price": 12
   *       "shrimp_torta_amount": 1,
   *       "total": 22
   *     }
   *   ]
   * }
   *
   * @apiErrorExample {json} Get event error
   * HTTP 1.1 500 Internal Server Error
   * {
   *   "code:": 500,
   *   "message": "Internal Server Error"
   * }
   */
  app.get("/v1/events", eventController.getEvents);

  /**
   * @api        {get}  /v1/events/:id Get an event
   * @apiGroup   Events
   *
   * @apiParam   {string}   id     event id
   *
   * @apiSuccess {Object}   event                                   events collection
   * @apiSuccess {string}   event.id                                event id
   * @apiSuccess {string}   event.name                              event name
   * @apiSuccess {number}   event.start_date                        event start date epoch
   * @apiSuccess {number}   event.end_date                          event end date epoch
   * @apiSuccess {number}   event.poc_chuc_torta_unit_price         event Poc Chuc torta price
   * @apiSuccess {number}   event.poc_chuc_torta_amount             event Poc Chuc torta amount
   * @apiSuccess {number}   event.shrimp_torta_unit_price           event shrimp torta price
   * @apiSuccess {number}   event.shrimp_torta_amount               event shrimp torta amount
   * @apiSuccess {number}   event.total                             event total price
   * @apiSuccess {Object[]} event.orders                            event orders
   * @apiSuccess {string}   event.orders.id                         event orders id
   * @apiSuccess {string}   event.orders.full_name                  event orders full name
   * @apiSuccess {number}   event.orders.poc_chuc_torta_unit_price  event Poc Chuc torta price
   * @apiSuccess {number}   event.orders.poc_chuc_torta_amount      event order Poc Chuc torta amount
   * @apiSuccess {number}   event.orders.shrimp_torta_unit_price    event shrimp torta price
   * @apiSuccess {number}   event.orders.shrimp_torta_amount        event order shrimp torta amount
   * @apiSuccess {number}   event.orders.total                      event order total price
   * @apiSuccess {boolean}  event.orders.paid                       event order paid status
   *
   * @apiSuccessExample {json} Success
   * HTTP 1.1 200 Ok
   * {
   *   "event": {
   *     "id": "1",
   *     "name": "Tortas para la oficina",
   *     "start_date": 10000,
   *     "end_date": 20000,
   *     "poc_chuc_torta_unit_price": 10,
   *     "poc_chuc_torta_amount": 2,
   *     "shrimp_torta_unit_price": 12
   *     "shrimp_torta_amount": 2,
   *     "total": 44,
   *     "orders": [
   *       {
   *         "id": "1",
   *         "full_name": "Juan Carlos",
   *         "poc_chuc_torta_unit_price": 10,
   *         "poc_chuc_torta_amount": 1,
   *         "shrimp_torta_unit_price": 12
   *         "shrimp_torta_amount": 1,
   *         "total": 22,
   *         "paid": false
   *       },
   *       {
   *         "id": "2",
   *         "full_name": "Juan Carlitos",
   *         "poc_chuc_torta_unit_price": 10,
   *         "poc_chuc_torta_amount": 2,
   *         "shrimp_torta_unit_price": 12
   *         "shrimp_torta_amount": 2,
   *         "total": 44,
   *         "paid": true
   *       }
   *     ]
   *   }
   * }
   *
   * @apiErrorExample {json} Event doesn't exist
   * HTTP 1.1 404 Not Found
   * {
   *   "status": 404,
   *   "message": "Not Found"
   * }
   *
   * @apiErrorExample   {json} Get event error
   * HTTP 1.1 500 Internal Server Error
   * {
   *   "code:": 500,
   *   "message": "Internal Server Error"
   * }
   */
  app.get(
    "/v1/events/:eventId",
    validation({ eventId: eventIdSchema }, "params"),
    eventController.getEvent
  );

  /**
   * @api      {put} /v1/events/:id Update an event
   * @apiGroup Events
   *
   * @apiParam {string}     id     event id
   *
   * @apiParam {Object}     event                                   events collection
   * @apiParam {string}     event.id                                event id
   * @apiParam {string}     event.name                              event name
   * @apiParam {number}     event.start_date                        event start date epoch
   * @apiParam {number}     event.end_date                          event end date epoch
   * @apiParam {number}     event.poc_chuc_torta_unit_price         event Poc Chuc torta price
   * @apiParam {number}     event.shrimp_torta_unit_price           event shrimp torta price
   *
   * @apiSuccess {Object}   event                                   events collection
   * @apiSuccess {string}   event.id                                event id
   * @apiSuccess {string}   event.name                              event name
   * @apiSuccess {number}   event.start_date                        event start date epoch
   * @apiSuccess {number}   event.end_date                          event end date epoch
   * @apiSuccess {number}   event.poc_chuc_torta_unit_price         event Poc Chuc torta price
   * @apiSuccess {number}   event.shrimp_torta_unit_price           event shrimp torta price
   *
   * @apiParamExample {json} Input
   * {
   *  "event_name": "Tortastic",
   *  "start_date": 1000,
   *  "end_date": 1000,
   *  "start_hour", 1000,
   *  "end_hour": 1000,
   *  "poc_chuc_torta_unit_price": 10,
   *  "shrimp_torta_unit_price": 12
   * }
   *
   * @apiSuccessExample {json} Success
   * HTTP 1.1 201 Created
   * {
   *  "id": "1"
   *  "event_name": "Tortastic",
   *  "start_date": 1000,
   *  "end_date": 1000,
   *  "start_hour", 1000,
   *  "end_hour": 1000,
   *  "poc_chuc_torta_unit_price": 10,
   *  "shrimp_torta_unit_price": 12
   * }
   *
   * @apiError emptyName            event_name is required
   * @apiError emptyStartDate       start_date is required
   * @apiError beforeCurrentDate    start_date must be a future date
   * @apiError invalidFormat        start_date must be a epoch time
   * @apiError emptyStartDate       end_date is required
   * @apiError beforeStartDate      end_date must be after start date
   * @apiError invalidFormat        end_date must be a epoch time
   * @apiError emptyStartHour       start_hour is required
   * @apiError notInRange           start_hour must be in the range from 0 to 24 * 60
   * @apiError invalidFormat        start_hour must be a number
   * @apiError emptyEndHour         end_hour is required
   * @apiError notInRange           end_hour must be in the range from 0 to 24 * 60
   * @apiError invalidFormat        end_hour must be a number
   * @apiError emptyPocChuPrice     poc_chuc_torta_unit_price is required
   * @apiError invalidPrice         poc_chuc_torta_unit_price must be a non-negative number
   * @apiError emptyShrimpPrice     shrimp_torta_unit_price is required
   * @apiError invalidPrice         shrimp_torta_unit_price must be a non-negative number
   *
   * @apiErrorExample {json} Bad Request
   * HTTP 1.1 400 Bad Request
   * {
   *   "status": 400,
   *   "message": "Bad Request",
   *   "errors": [
   *     {
   *       "field": "event_name",
   *       "error": "Is required"
   *     }
   *   ]
   * }
   *
   * @apiErrorExample {json} Event is already finished
   * HTTP 1.1 400 Bad Request
   * {
   *   "status": 400,
   *   "message": "Bad Request",
   *   "reason": "Event has already finished"
   * }
   *
   * @apiErrorExample {json} Event doesn't exist
   * HTTP 1.1 404 Not Found
   * {
   *   "status": 404,
   *   "message": "Not Found"
   * }
   *
   * @apiErrorExample {json} Update event error
   * HTTP 1.1 500 Internal Server Error
   * {
   *  "code:": 500,
   *  "message": "Internal Server Error"
   * }
   *
   */

  app.put(
    "/v1/events/:eventId",
    validation({ eventId: eventIdSchema }, "params"),
    validation(createEventSchema),
    eventController.updateEvent
  );

  /**
   * @api      {post} /v1/events/:id  Create an event
   * @apiGroup Events
   *
   * @apiParam {Object}     event                                   events collection
   * @apiParam {string}     event.name                              event name
   * @apiParam {number}     event.start_date                        event start date epoch
   * @apiParam {number}     event.end_date                          event end date epoch
   * @apiParam {number}     event.poc_chuc_torta_unit_price         event Poc Chuc torta price
   * @apiParam {number}     event.shrimp_torta_unit_price           event shrimp torta price
   *
   * @apiSuccess {Object}   event                                   events collection
   * @apiSuccess {string}   event.id                                event id
   * @apiSuccess {string}   event.name                              event name
   * @apiSuccess {number}   event.start_date                        event start date epoch
   * @apiSuccess {number}   event.end_date                          event end date epoch
   * @apiSuccess {number}   event.poc_chuc_torta_unit_price         event Poc Chuc torta price
   * @apiSuccess {number}   event.shrimp_torta_unit_price           event shrimp torta price
   *
   * @apiParamExample {json} Input
   * {
   *  "event_name": "Tortastic",
   *  "start_date": 1000,
   *  "end_date": 1000,
   *  "start_hour", 1000,
   *  "end_hour": 1000,
   *  "poc_chuc_torta_unit_price": 10,
   *  "shrimp_torta_unit_price": 12
   * }
   *
   * @apiSuccessExample {json} Success
   * HTTP 1.1 201 Created
   * {
   *  "id": "1"
   *  "event_name": "Tortastic",
   *  "start_date": 1000,
   *  "end_date": 1000,
   *  "start_hour", 1000,
   *  "end_hour": 1000,
   *  "poc_chuc_torta_unit_price": 10,
   *  "shrimp_torta_unit_price": 12
   * }
   *
   * @apiError emptyName            event_name is required
   * @apiError emptyStartDate       start_date is required
   * @apiError beforeCurrentDate    start_date must be a future date
   * @apiError invalidFormat        start_date must be a epoch time
   * @apiError emptyStartDate       end_date is required
   * @apiError beforeStartDate      end_date must be after start date
   * @apiError invalidFormat        end_date must be a epoch time
   * @apiError emptyStartHour       start_hour is required
   * @apiError notInRange           start_hour must be in the range from 0 to 24 * 60
   * @apiError invalidFormat        start_hour must be a number
   * @apiError emptyEndHour         end_hour is required
   * @apiError notInRange           end_hour must be in the range from 0 to 24 * 60
   * @apiError invalidFormat        end_hour must be a number
   * @apiError emptyPocChuPrice     poc_chuc_torta_unit_price is required
   * @apiError invalidPrice         poc_chuc_torta_unit_price must be a non-negative number
   * @apiError emptyShrimpPrice     shrimp_torta_unit_price is required
   * @apiError invalidPrice         shrimp_torta_unit_price must be a non-negative number
   *
   * @apiErrorExample {json} Bad Request
   * HTTP 1.1 400 Bad Request
   * {
   *   "status": 400,
   *   "message": "Bad Request",
   *   "errors": [
   *     {
   *       "field": "event_name",
   *       "error": "Is required"
   *     }
   *   ]
   * }
   *
   * @apiErrorExample {json} Update event error
   * HTTP 1.1 500 Internal Server Error
   * {
   *  "code:": 500,
   *  "message": "Internal Server Error"
   * }
   *
   */
  app.post(
    "/v1/events",
    validation(createEventSchema),
    eventController.createEvent
  );
};
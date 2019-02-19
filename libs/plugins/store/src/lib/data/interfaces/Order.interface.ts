export enum OrderStatus {
  DRAFT = 'draft',
  UNFULFILLED = 'unfulfilled',
  PARTIALLY_FULFILLED = 'partially fulfilled',
  FULFILLED = 'fulfilled',
  CANCELED = 'canceled'
}

export enum OrderFulfillmentStatus {
  FULFILLED = 'fulfilled',
  CANCELED = 'canceled'
}

export enum OrderEventTypes {
  PLACED = 'placed',
  PLACED_FROM_DRAFT = 'draft_placed',
  OVERSOLD_ITEMS = 'oversold_items',
  ORDER_MARKED_AS_PAID = 'marked_as_paid',
  CANCELED = 'canceled',
  ORDER_FULLY_PAID = 'order_paid',
  UPDATED = 'updated',

  EMAIL_SENT = 'email_sent',
  SMS_SENT = 'sms_sent',

  PAYMENT_CAPTURED = 'captured',
  PAYMENT_REFUNDED = 'refunded',
  PAYMENT_VOIDED = 'voided',

  FULFILLMENT_CANCELED = 'fulfillment_canceled',
  FULFILLMENT_RESTOCKED_ITEMS = 'restocked_items',
  FULFILLMENT_FULFILLED_ITEMS = 'fulfilled_items',

  TRACKING_UPDATED = 'tracking_updated',

  NOTE_ADDED = 'note_added',
}

export enum OrderEventsEmails {
  ORDER = 'order_confirmation',
  PAYMENT = 'payment_confirmation',
  SHIPPING = 'shipping_confirmation',
  FULFILLMENT = 'fulfillment_confirmation'
}


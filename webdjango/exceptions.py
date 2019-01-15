from rest_framework.exceptions import APIException

'''
 EVERY TIME YOU ADD A NEW ERROR HERE PLEASE, UPDATE THE DOCUMENTATION -> ERRORS
'''


# 400 ERRORS for Bad Requests
class BadRequest(APIException):
    status_code = 400
    default_detail = 'The request could not be understood by the server due to malformed syntax.'
    default_code = '400001'


class ValidationError(BadRequest):
    default_detail = 'Your request has malformed syntax or is lacking fields.'
    default_code = '400002'


class EntryNotFound(BadRequest):
    default_detail = 'Entry Not Found'
    default_code = '400003'


class CantDelete(BadRequest):
    default_detail = 'You Can\'t delete this entry'
    default_code = '400004'


# 401 For Unauthorized Requests
class Unauthorized(APIException):
    status_code = 401
    default_detail = 'The request requires user authentication. The response MUST include a WWW-Authenticate header field with a JWT Token'
    default_code = '401001'


class AuthenticationFailed(Unauthorized):
    default_detail = 'Authentication credentials not found.'
    default_code = '401002'


class AccountDisabled(Unauthorized):
    default_detail = 'User account is disabled, if you do not know why, please contact us'
    default_code = '401003'


class TwoStepAuthRequired(Unauthorized):
    default_detail = 'User account requires two step authentication, please validate your token with the two step authentication'
    default_code = '401004'


class InvalidTwoStepAuthCode(Unauthorized):
    default_detail = 'The two step verification code is invalid'
    default_code = '401005'


class TwoStepAuthCodeCodeDoesNotExist(Unauthorized):
    default_detail = 'The two step verification code does not exists'
    default_code = '401006'
    status_code = 429


class ToManyTriesTwoStepAuthCode(Unauthorized):
    default_detail = 'The two step validation code was invalidated for to many tries, please request a new code'
    default_code = '401005'
    status_code = 429


class ExpireJwtSignature(Unauthorized):
    default_detail = 'Signature has expired'
    default_code = '401007'
    status_code = 429


class InvalidJwtToken(Unauthorized):
    default_detail = 'The JWT signature is invalid'
    default_code = '401008'
    status_code = 429


# 402 for Payment Related Errors
class PaymentRequired(APIException):
    status_code = 402
    default_detail = 'Missing Payment from the account, please check your billing information'
    default_code = '402001'


class NotEnoughCredit(PaymentRequired):
    default_detail = 'You haven\'t set up Auto Recharge on your account, please go to your billing tab and set it up in order to continue to use.'
    default_code = '402002'


class AutoRechargeRequired(PaymentRequired):
    default_detail = 'Your Account is severely negative and is no longer sending requests, please go to your billing and update your payemnt information.'
    default_code = '402002'


class PaymentFailed(PaymentRequired):
    default_detail = 'Your payment information is invalid, please check you payment information'
    default_code = '402004'


class NoPaymentMethod(PaymentFailed):
    default_deteail = 'You do not have any payment method registered in your account'
    default_code = '402005'


# 403 for Forbidden Reletaed Errors
class Forbidden(APIException):
    status_code = 403
    default_detail = 'Your account is not authorized to perform the operation'
    default_code = '403001'


class PermissionDenied(Forbidden):
    default_detail = 'Your account is not authorized to perform the operation'
    default_code = '403002'


class NotAuthenticated(Forbidden):
    default_detail = 'Please Authenticate before sending request'
    default_code = '403003'


# 404 for Not Found Related Errors
class NotFound(APIException):
    status_code = 404
    default_detail = 'The server has not found anything matching the Request-URI.'
    default_code = '404001'


# 405 for Method Not Allowed Related Errors
class MethodNotAllowed(APIException):
    status_code = 405
    default_detail = 'The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.'
    # TODO: The response MUST include an Allow header containing a list of valid methods for the requested resource.
    default_code = '405001'


# 406 for Not Found Related Errors
class NotAcceptable(APIException):
    status_code = 406
    default_detail = 'The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request.'
    default_code = '406001'


# 406 for Not Found Related Errors
class ReachedDownloadTimesLimit(APIException):
    status_code = 407
    default_detail = 'You have reached the limit of times you can download this file.'
    default_code = '407001'


# TODO: Unless it was a HEAD request, the response SHOULD include an entity containing a list of available entity characteristics and location(s) from which the user or user agent can choose the one most appropriate.


# 407 Proxy Authentication Required Related Errors
class ProxyAuthenticationRequired(APIException):
    status_code = 407
    default_detail = 'Please first authenticate with the proxy.'
    default_code = '407001'


# 408 Reuest Timeout related Errors
class RequestTimeout(APIException):
    status_code = 408
    default_detail = 'The client did not produce a request within the time that the server was prepared to wait. 4.2 Seconds'  # Per Azure Servers
    default_code = '408001'


# 409 Conflict Related Errors
class Conflict(APIException):
    status_code = 409
    default_detail = 'The request could not be completed due to a conflict with the current state of the resource.'
    default_code = '409001'


# The response body SHOULD include enough information for the user to recognize the source of the conflict.


# 410 Gone related Errors
class Gone(APIException):
    status_code = 410
    default_detail = 'The requested resource is no longer available at the server and no forwarding address is known.'
    default_code = '410001'


# 411 Length Required related Errors
class LengthRequired(APIException):
    status_code = 411
    default_detail = 'The server refuses to accept the request without a defined Content-Length.'
    default_code = '411001'


# 412 Precondition Failed related Errors
class PreconditionFailed(APIException):
    status_code = 412
    default_detail = 'The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.'
    default_code = '412001'


# 413 Request Entity Too Large related Errors
class RequestEntityTooLarge(APIException):
    status_code = 413
    default_detail = 'The server is refusing to process a request because the request entity is larger than the server is willing or able to process.'
    default_code = '413001'


# 414 Request-URI Too Long Related Erorrs
class RequestURITooLong(APIException):
    status_code = 414
    default_detail = 'The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret.'
    default_code = '414001'


# 415 Unsupported Media Type Related Errors
class UnsupportedMediaType(APIException):
    status_code = 415
    default_detail = 'The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.'
    default_code = '415001'


# 416 Requested Range Not Satisfiable // Will be used for chunk download
class RequestedRangeNotSatisfiable(APIException):
    status_code = 416
    default_detail = 'The Range of the Request it\'s not valid, please make sure you are requesting a valid range for this file'
    default_code = '416001'


# TODO: When this status code is returned for a byte-range request, the response SHOULD include a Content-Range entity-header field specifying the current length of the selected resource


# 429 Too Many Requests Related Errors
class TooManyRequests(APIException):
    status_code = 429
    default_detail = 'Too Many Requests, please wait!'
    default_code = '429001'


# 500 Internal Server Error related Errors
class InternalServerError(APIException):
    status_code = 500
    default_detail = 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
    default_code = '500001'


# 501 Not Implemented related Errors
class NotImplemented(APIException):
    status_code = 501
    default_detail = 'The server does not support the functionality required to fulfill the request.'
    default_code = '501001'


# 502 Bad Gateway Related Errors
class BadGateway(APIException):
    status_code = 502
    default_detail = 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.'
    default_code = '502001'


# 503 ServiceUnavailable related Errors
class ServiceUnavailable(APIException):
    status_code = 503
    default_detail = 'The server is currently unable to handle the request due to a temporary overloading or maintenance of the server, try again later.'
    default_code = '503001'


# 504 Gateway Timeout Related Errors

class GatewayTimeout(APIException):
    status_code = 504
    default_detail = 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI '
    default_code = '504001'


# 505 Gateway Timeout Related Errors
class HTTPVersionNotSupported(APIException):
    status_code = 505
    default_detail = 'The server does not support, or refuses to support, the HTTP protocol version that was used in the request message.'
    default_code = '505001'
# TODO: the response SHOULD contain an entity describing why that version is not supported and what other protocols are supported by that server.

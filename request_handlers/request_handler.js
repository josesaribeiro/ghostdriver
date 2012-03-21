var ghostdriver = ghostdriver || {};

ghostdriver.RequestHandler = function() {
    // private:
    var
    _handle = function(request, response) {
        // Decorate the Request object
        request.urlParsed = parseUri(request.url);

        // Decorate the Response object
        response.setHeader("Cache", "no-cache");
        response.setHeader("Content-Type", "application/json;charset=UTF-8");
        response.writeJSON = function(obj) { this.write(JSON.stringify(obj)); };
    },

    _buildResponseBody = function(sessionId, statusCode, value) {
        return {
            "sessionId" : sessionId || null,
            "statusCode" : statusCode || ghostdriver.ResponseStatusCodes.SUCCESS,
            "value" : value || {}
        };
    },

    _buildSuccessResponseBody = function(sessionId, value) {
        return _buildResponseBody(sessionId, ghostdriver.ResponseStatusCodes.SUCCESS, value);
    };

    // public:
    return {
        handle : _handle,
        buildResponseBody : _buildResponseBody,
        buildSuccessResponseBody : _buildSuccessResponseBody
    };
};

// List of all the possible Response Status Codes
ghostdriver.ResponseStatusCodes = {};
ghostdriver.ResponseStatusCodes.SUCCESS                        = 0;
ghostdriver.ResponseStatusCodes.NO_SUCH_ELEMENT                = 7;
ghostdriver.ResponseStatusCodes.NO_SUCH_FRAME                  = 8;
ghostdriver.ResponseStatusCodes.UNKNOWN_COMMAND                = 9;
ghostdriver.ResponseStatusCodes.STALE_ELEMENT_REFERENCE        = 10;
ghostdriver.ResponseStatusCodes.ELEMENT_NOT_VISIBLE            = 11;
ghostdriver.ResponseStatusCodes.INVALID_ELEMENT_STATE          = 12;
ghostdriver.ResponseStatusCodes.UNKNOWN_ERROR                  = 13;
ghostdriver.ResponseStatusCodes.ELEMENT_IS_NOT_SELECTABLE      = 15;
ghostdriver.ResponseStatusCodes.JAVA_SCRIPT_ERROR              = 17;
ghostdriver.ResponseStatusCodes.XPATH_LOOKUP_ERROR             = 19;
ghostdriver.ResponseStatusCodes.TIMEOUT                        = 21;
ghostdriver.ResponseStatusCodes.NO_SUCH_WINDOW                 = 23;
ghostdriver.ResponseStatusCodes.INVALID_COOKIE_DOMAIN          = 24;
ghostdriver.ResponseStatusCodes.UNABLE_TO_SET_COOKIE           = 25;
ghostdriver.ResponseStatusCodes.UNEXPECTED_ALERT_OPEN          = 26;
ghostdriver.ResponseStatusCodes.NO_ALERT_OPEN_ERROR            = 27;
ghostdriver.ResponseStatusCodes.SCRIPT_TIMEOUT                 = 28;
ghostdriver.ResponseStatusCodes.INVALID_ELEMENT_COORDINATES    = 29;
ghostdriver.ResponseStatusCodes.IME_NOT_AVAILABLE              = 30;
ghostdriver.ResponseStatusCodes.IME_ENGINE_ACTIVATION_FAILED   = 31;
ghostdriver.ResponseStatusCodes.INVALID_SELECTOR               = 32;
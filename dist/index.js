"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Format Helpers for Numbers
 */
var Formatter = /** @class */ (function () {
    function Formatter(locale) {
        this.locale = "en-US";
        if (locale != null && typeof locale === "string") {
            this.locale = locale;
        }
        else if (navigator.language) {
            this.locale = navigator.language;
        }
    }
    /**
     * Formats a number as a percentage.
     *
     * @param val the number to format
     * @param decimals the number of decimal places to include
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asPct(0.1236, 1) => "12.4%"
     */
    Formatter.prototype.asPct = function (val, decimals, defaultValue) {
        var toFormat = this.validateValue(val);
        if (toFormat === false) {
            return defaultValue;
        }
        else {
            var fmt = new Intl.NumberFormat(this.locale, this.createOpts(decimals, "pct"));
            return fmt.format(toFormat);
        }
    };
    /**
     * Formats a number as a currency.
     *
     * @param val the number to format
     * @param decimals the number of decimal places to include
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asMoney(12345.67, 2) => "$12,345.67"
     */
    Formatter.prototype.asMoney = function (val, decimals, defaultValue) {
        var toFormat = this.validateValue(val);
        if (toFormat === false) {
            return defaultValue;
        }
        else {
            var fmt = new Intl.NumberFormat(this.locale, this.createOpts(decimals, "money"));
            return fmt.format(toFormat);
        }
    };
    /**
     * Formats a number as a percentage.
     *
     * @param val the number to format
     * @param decimals the number of decimal places to include
     * @param useSeparator whether to include thousands separator. Default: true
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asFixed(123456.789, 1) => "123,456.8"
     */
    Formatter.prototype.asFixed = function (val, decimals, useSeparator, defaultValue) {
        if (useSeparator === void 0) { useSeparator = true; }
        var toFormat = this.validateValue(val);
        if (toFormat === false) {
            return defaultValue;
        }
        else {
            var fmt = new Intl.NumberFormat(this.locale, this.createOpts(decimals, "fixed", useSeparator));
            return fmt.format(toFormat);
        }
    };
    /**
     * Formats a Date or time number as a locale string.
     *
     * @param val the Date to format
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asDate(new Date()) => "6/14/2019"
     */
    Formatter.prototype.asDate = function (val, defaultValue) {
        var d;
        if (typeof val === "number")
            d = new Date(val);
        else if (!(val instanceof Date))
            return defaultValue;
        else
            d = val;
        return d.toLocaleDateString(this.locale);
    };
    Formatter.prototype.asTime = function (val, defaultValue) {
        var d;
        if (typeof val === "number")
            d = new Date(val);
        else if (!(val instanceof Date))
            return defaultValue;
        else
            d = val;
        return d.toLocaleTimeString(this.locale);
    };
    Formatter.prototype.asDateTime = function (val, defaultValue) {
        var d;
        if (typeof val === "number")
            d = new Date(val);
        else if (!(val instanceof Date))
            return defaultValue;
        else
            d = val;
        return d.toLocaleDateString(this.locale) + " " + d.toLocaleTimeString(this.locale);
    };
    /**
     * Formats a number/string as a phone number
     *
     * @param val the number to format
     * @param defaultValue default value returned if val is null, undefined, or not a number or string
     * @param separator string to separate phone number parts. defautls to "-"
     * @returns formatted result. Example: asPhoneNumber(1234567890) => "123-456-7890"
     */
    Formatter.prototype.asPhoneNumber = function (val, defaultValue, separator) {
        if (separator === void 0) { separator = "-"; }
        if (val == null)
            return defaultValue;
        if (typeof val === "number")
            val = val.toString();
        if (typeof val !== "string")
            return defaultValue;
        if (val.length === 7) {
            return "" + val.substr(0, 3) + separator + val.substr(3);
        }
        else if (val.length === 10) {
            return "" + val.substr(0, 3) + separator + val.substr(3, 3) + separator + val.substr(6);
        }
        else if (val.length === 11) {
            return "" + val.substr(0, 1) + separator + val.substr(1, 3) + separator + val.substr(4, 3) + separator + val.substr(7);
        }
        else {
            return val;
        }
    };
    Formatter.prototype.validateValue = function (val) {
        if (val == null) {
            console.warn("formatter provided an invalid val.", val);
            return false;
        }
        else if (typeof val !== "string" && typeof val !== "number") {
            console.warn("formatter provided an invalid val.", val);
            return false;
        }
        else if (typeof val === "string") {
            try {
                return parseFloat(val);
            }
            catch (err) {
                console.error(err);
                return false;
            }
        }
        else if (typeof val === "number") {
            return val;
        }
        return false;
    };
    Formatter.prototype.createOpts = function (decimals, type, useSeparator) {
        if (useSeparator === void 0) { useSeparator = true; }
        var opts = { minimumFractionDigits: decimals, maximumFractionDigits: decimals };
        switch (type) {
            case "fixed":
                opts.useGrouping = useSeparator;
                return opts;
            case "pct":
                opts.style = "percent";
                return opts;
            case "money":
                opts.style = "currency";
                opts.currency = "USD";
                return opts;
            default:
                return opts;
        }
    };
    return Formatter;
}());
exports.Formatter = Formatter;
exports.default = new Formatter();

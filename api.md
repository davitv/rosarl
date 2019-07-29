
### Homepage manufacturers
```
/api/manufacturers/
```
Retrieves the list of categories for home page map wrapper, doesn't accept any arguments.
Response:

```typescript
{
    manufacturer_id: number;
    mf_category_id: null | number;
    mf_desc: null | string;
    mf_email: null | string;
    mf_image_url: string; // name of the image, full path can be found by concatenating /media/images/ and this value
    mf_name: string;
    mf_number: number;
    mf_url: string; // url to manufacturer category page

    // categories of manufacturer, the horizontal alined ones.
    categories: {
        category_url: string; // url to the page on rosar
        mf_category_desc: null | string;
        mf_category_id: number;
        mf_category_image_url: string; // concatenate with '/media/images/' for getting full path
        mf_category_name: string;
        mf_category_number: number;
        mf_id: number;
    }[];
}[];
```

### Company info
```
/api/company-info/
```
Get data for header tabs. Response:
```typescript
{
    about: string; // text about the company
    contacts: {
        routeScheme: string; // url to the image with scheme 
        textBefore: string; // text, that comes first
        address: string;
        route: string; // text that accompanies the scheme image 
        textAfter: string; // the final text chunk
        warehouseAddress: string;
    }
    address: string;
    managers: {
        email: string;
        name: string;
    }[];
    route: string;
    routeScheme: string;
    textAfter: string;
    textBefore: string;
    warehouseAddress: string;
    payment: {
        image_url: string;
        text: string;
    }
    image_url: string; // concat /media/images/
    text: string;
}
```


### Categories
```
/api/categories/
```
Retrieve the categories tree. Response:
```typescript


```typescript
type Category = {
    id: number;
    parent: number;
    name: string;
    children: Category[];
}
// ACTUAL RESPONSE:
{
    count: number;
    results: Category[];
}
```

### Products
```
/api/products/
```
Retrieve the products list. Accepts ```category``` and ```attributes``` GET params, attributes can be multiple, comma separated (i.e. ```/api/products/?attributes=13%2C34&category=29210``).

Response examples:
```typescript

export interface Attribute {
    id: number;
    name: string;
    value: string;
}

interface Product {
    product_id: number;
    name: string;
    article: string;
    description: string;
    product_s_desc: string;
    price: number;
    width: number;
    height: number;
    length: number;
    weight: number;

    product_full_image: string;
    product_thumb_image: string;
    images: Photo[];
    attributes: Attribute[];
}

// ACTUAL RESPONSE:
{
   count: number;
   next: string | null; // absolute url to the next page of results
   previous: string | null; // same as above, but for prev results
   results: Product[];
}



```
### Category related attributes
```
/api/attributes/
```
Retrieves the list of existing product attributes for category determined by GET param ```category_id```. Response example:
```typescript

interface FilteringAttribute {
    name: string;
    choices: {
        name: string;
        value: number; // this is used for /api/products/ endpoint as attributes GET param
    }[];
}

// ACTUAL RESPONSE
{
   results: FilteringAttribute[];
}
```

### Order

```
/api/orders/
```
Endpoint for making orders. Accepts POST JSON encoded data as body, example:
```
curl 'http://rosar-l-test.ru/api/orders/' -H 'authorization: ' -H 'Origin: http://rosar-l-test.ru' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.9,ru;q=0.8,la;q=0.7,uk;q=0.6,fr;q=0.5' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36' -H 'content-type: application/json;charset=UTF-8' -H 'Accept: */*' -H 'Referer: http://rosar-l-test.ru/catalogue/29210/' -H 'Connection: keep-alive' --data-binary '{"order_type":"individual","organization_name":"aaa","email":"davitvrd@gmail.com","kpp":"","rsn":"","inn":"","bik":"","korn":"","phone":"+79261234567","bank_name":"","first_name":"Samvel","last_name":"Vardanyan","patronymic":"sss","legal_address":"","address":"Degt, Degt","city":"Mikolaiv","postal":"","delivery_method":0,"products":[{"id":636131,"amount":1},{"id":636160,"amount":1}],"delivery":{"method":0,"full_name":"Samvel Vardanyan","address":"Degt, Degt","city":"Mikolaiv","phone":"980699642"}}' --compressed --insecure
```

The request body data types are:
```typescript

enum BusinessType {
    INDIVIDUAL = 'individual', // физ. лицо
    LEGAL = 'legal', // юр. лицо
    RETAILER = 'retailer', // ИП
}

enum DeliveryMethod {
    MOSCOW = 0,
    RUSSIA,
    PICKUP
}

// THE ACTUAL REQUEST DATA
interface OrderData {
    id?: number;
    order_type: BusinessType;
    deliveryMethod: DeliveryMethod;
    organization_name: string;
    phone: string;
    email: string;

    inn: string;
    kpp: string;
    bik: string;
    korn: string;
    rsn: string;

    first_name: string;
    last_name: string;
    patronymic: string;
    legal_address: string;
    individual_address: string;
    city: string;
    postal: string;

    bank_name: string;

    products: {
        id: number;
        amount: number;

        product?: Product;
    }[];
}

```

!! KEEP IN MIND !!!

For any type of request the data is always same, just the serializer changes on backend based on ```BusinessType``` type value so you should carry that logic on FE side.

The response body would have the same format as the request __with optional fields set__ (i.e. ```products.product``` will have a value of ordered product item).


### Account Login

```
/api/login/
```

Quite self-explanatory, accepts POST requests with username/password key-value json, i.e. :
```
{"username":"examile@gmail.com","password":"yFdsTVnSRC"}
```

The successful response contains full info about current account. JSON encoded with token used for authentication. 

```
date_joined: "2019-04-22T09:23:02Z"
email: "example@gmail.com"
first_name: "Вадим"
id: 7
is_active: true
is_staff: false
last_login: null
last_name: "smith"
phone: "+79261234566"
token: "fa8662393bf8eca99a03ba89885e15da7c44477d" // this should be used in headers  for auth request, i.e. authorization: fa8662393bf8eca99a03ba89885e15da7c44477d
```

### Account information
```
/api/user-info/
```
Accepts only GET with no params, send the token fetched from endpoint described just before i.e.
```curl 'http://rosar-l-test.ru/api/user-info/' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.9,ru;q=0.8,la;q=0.7,uk;q=0.6,fr;q=0.5' -H 'authorization: fa8662393bf8eca99a03ba89885e15da7c44477d' -H 'Accept: */*' -H 'Referer: http://rosar-l-test.ru/account/' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36' -H 'Connection: keep-alive' --compressed --insecure```

Response data types are next:
```typescript
export interface Address {
    id:  number;
    method:  number;
    phone:  string;
    address:  string;
    city:  string;
    email:  null | string;
    full_name:  string;
    carrier:  string;
}

interface OrderProduct {
    id: number;
    product: {
        name: string;
        article: string;
        description: string;
        price: number;
        images:[],
        product_s_desc: string;
        product_thumb_image:  string;
        product_full_image:  string;
        product_id: number;
        weight: number;
        width: number;
        height: number;
        length: number;
   },
   amount: number;
   order: number;
}

interface Order {
    id: number;
    bank_name: string;
    bik: string;
    city: string;
    date_added: string;
    date_modified: string;
    delivery: number;
    delivery_method: string;
    email: string;
    first_name: string;
    individual_address: string;
    inn: string;
    korn: string;
    kpp: string;
    last_name: string;
    legal_address: string;
    order_type: BusinessType;
    organization_name: string;
    patronymic: string;
    phone: string;
    postal: string;
    rsn: string;
    products: OrderProduct[];
}

// ACTUAL RESPONSE BODY
interface UserDetails {
    orders: Order[];
    addresses: Address[];
}





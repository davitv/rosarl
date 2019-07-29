
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



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

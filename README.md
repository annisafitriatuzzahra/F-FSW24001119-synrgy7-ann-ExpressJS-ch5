
# Car Management Dashboard

## Daftar Isi

1. [Entity Relationship Diagram](#entity-relationship-diagram)
2. [REST API Endpoints](#rest-api-endpoints)
  - [GET /api/v1/cars](#get-apiv1cars)
  - [GET /api/v1/cars/:id](#get-apiv1carsid)
  - [POST /api/v1/cars](#post-apiv1cars)
  - [PUT /api/v1/cars/:id](#put-apiv1carsid)
  - [DELETE /api/v1/cars/:id](#delete-apiv1carsid)

## Entity Relationship Diagram
![Entity Relationship Diagram](https://github.com/annisafitriatuzzahra/F-FSW24001119-synrgy7-ann-ExpressJS-ch5/assets/96147529/7beaa913-36a9-44a7-b658-d18983abc322)

## REST API Endpoints

Berikut adalah daftar endpoint dari REST API yang digunakan dalam proyek ini:

### GET /api/v1/cars

Mengambil seluruh data mobil.

**Contoh Response Body**

```json
[
    {
        "id": 2,
        "name": "pajero",
        "pict": "http://res.cloudinary.com/dg0ny6pr4/image/upload/v1716796439/d4eujuddulpurlajusyy.png",
        "price": 210000,
        "start_rent": null,
        "finish_rent": null,
        "created_at": "2024-05-26T17:00:00.000Z"
    },
    {
        "id": 1,
        "name": "avanza",
        "pict": "http://res.cloudinary.com/dg0ny6pr4/image/upload/v1716796682/fpl8fuk7dftlvirmafbd.png",
        "price": 200000,
        "start_rent": null,
        "finish_rent": null,
        "created_at": null
    }
]
```
### GET /api/v1/cars/:id

Mengambil data mobil berdasarkan ID mobil yang diberikan sebagai parameter dalam URL.

**Contoh Response Body**

```json
[
    {
        "id": 1,
        "name": "avanza",
        "pict": "http://res.cloudinary.com/dg0ny6pr4/image/upload/v1716796682/fpl8fuk7dftlvirmafbd.png",
        "price": 200000,
        "start_rent": null,
        "finish_rent": null,
        "created_at": null
    }
]
```
### POST /api/v1/cars

Menambahkan data baru mobil.

**Contoh Permintaan (Request Body)**

```json
{
  "name": "agya",
  "pict": "tes.png",
  "price": 100000,
  "start_rent": null,
  "finish_rent": null,
  "created_at": ""
}
```
**Contoh Response Body**

```json
[
    {
        "id": 4,
        "name": "agya",
        "pict": "http://res.cloudinary.com/dg0ny6pr4/image/upload/v1716796682/fpl8fuk7dftlvirmafbd.png",
        "price": 100000,
        "start_rent": null,
        "finish_rent": null,
        "created_at": "2024-05-27T17:00:00.000Z"
    }
]
```
### PUT /api/v1/cars/:id

Mengubah data mobil yang sudah ada.

**Contoh Permintaan (Request Body)**

```json
{
  "name": "agya",
  "pict": "tes.png",
  "price": 150000,
  "start_rent": null,
  "finish_rent": null,
  "created_at": ""
}
```

**Contoh Response Body**

```json
[
    {
        "name": "agya",
        "pict": "tes.png",
        "price": 150000,
        "start_rent": null,
        "finish_rent": null,
        "created_at": "2024-05-26T17:30:00.000Z"
    }
]
```

### DELETE /api/v1/cars/:id

Menghapus data mobil yang sudah ada berdasarkan ID mobil yang diberikan sebagai parameter.

**Contoh Response Body**

- **200 OK**: Data Berhasil Dihapus.
- **404 Not Found**: Data tidak ditemukan!

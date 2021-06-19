### Retrieve Monthly Net Assets for an Organization
Endpoint:  `GET /organization/{organizationId}/monthlyNetAssets/{numberOfMonths}`

Authorization: Requester must have VIEW permissions.

Retrieves the value of net assets for an organization by the end of the month, for every month from the present until {numberOfMonths - 1}  months ago.

If numberOfMonths is 12, 12 objects will be returned.
___
#### Returns
Returns an array of objects in this format: 
```json
[
    {
        "netAssets": 0,
        "yearMonth": 202007
    },
    {
        "netAssets": 0,
        "yearMonth": 202008
    },
    {
        "netAssets": 0,
        "yearMonth": 202009
    },
    {
        "netAssets": 0,
        "yearMonth": 202010
    },
    {
        "netAssets": 412570,
        "yearMonth": 202011
    },
    {
        "netAssets": 412570,
        "yearMonth": 202012
    },
    {
        "netAssets": 412570,
        "yearMonth": 202101
    },
    {
        "netAssets": 412570,
        "yearMonth": 202102
    },
    {
        "netAssets": 412570,
        "yearMonth": 202103
    },
    {
        "netAssets": 412570,
        "yearMonth": 202104
    },
    {
        "netAssets": 412570,
        "yearMonth": 202105
    },
    {
        "netAssets": 387570,
        "yearMonth": 202106
    }
]
```

**netAssets** is a decimal representing the value of net assets for this organization as of the end of the month specified in **yearMonth**.

**yearMonth** is the time period at which the value of net assets is calculated for each object. This is in `yyyymm` format. For example, the following object 
```json
    {
        "netAssets": 387570,
        "yearMonth": 202106
    }
```
indicates that the specified organization has net assets of 387570 as of the end of June 2021.
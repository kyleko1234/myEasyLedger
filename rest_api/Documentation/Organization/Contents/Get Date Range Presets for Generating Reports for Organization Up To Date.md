### Get Date Range Presets for Generating Reports for Organization Up To Date

Endpoint: `GET /organization/{organizationId}/dateRangePresetsUpToDate/{endDate}/{locale}`

Authorization: Requester must have view permissions.

Returns a list of fiscal year and quarterly date range presets for the given organization, formatted for React-Select grouped options.
```json
[
    {
        "options": [
            {
                "label": "2022",
                "value": "2022",
                "object": {
                    "name": "2022",
                    "prevPeriodEndDate": "2021-12-31",
                    "startDate": "2022-01-01",
                    "endDate": "2022-12-31"
                }
            },
            {
                "label": "2021",
                "value": "2021",
                "object": {
                    "name": "2021",
                    "prevPeriodEndDate": "2020-12-31",
                    "startDate": "2021-01-01",
                    "endDate": "2021-12-31"
                }
            },
            {
                "label": "2020",
                "value": "2020",
                "object": {
                    "name": "2020",
                    "prevPeriodEndDate": "2019-12-31",
                    "startDate": "2020-01-01",
                    "endDate": "2020-12-31"
                }
            }
        ],
        "label": "Annual"
    },
    {
        "options": [
            {
                "label": "2022 Q1",
                "value": "2022 Q1",
                "object": {
                    "name": "2022 Q1",
                    "prevPeriodEndDate": "2021-12-31",
                    "startDate": "2022-01-01",
                    "endDate": "2022-03-31"
                }
            },
            {
                "label": "2021 Q4",
                "value": "2021 Q4",
                "object": {
                    "name": "2021 Q4",
                    "prevPeriodEndDate": "2021-09-30",
                    "startDate": "2021-10-01",
                    "endDate": "2021-12-31"
                }
            },
            {
                "label": "2021 Q3",
                "value": "2021 Q3",
                "object": {
                    "name": "2021 Q3",
                    "prevPeriodEndDate": "2021-06-30",
                    "startDate": "2021-07-01",
                    "endDate": "2021-09-30"
                }
            },
            {
                "label": "2021 Q2",
                "value": "2021 Q2",
                "object": {
                    "name": "2021 Q2",
                    "prevPeriodEndDate": "2021-03-31",
                    "startDate": "2021-04-01",
                    "endDate": "2021-06-30"
                }
            },
            {
                "label": "2021 Q1",
                "value": "2021 Q1",
                "object": {
                    "name": "2021 Q1",
                    "prevPeriodEndDate": "2020-12-31",
                    "startDate": "2021-01-01",
                    "endDate": "2021-03-31"
                }
            },
            {
                "label": "2020 Q4",
                "value": "2020 Q4",
                "object": {
                    "name": "2020 Q4",
                    "prevPeriodEndDate": "2020-09-30",
                    "startDate": "2020-10-01",
                    "endDate": "2020-12-31"
                }
            }
        ],
        "label": "Quarterly"
    }
]
```

Objects are returned in order from most recent to least recent. The most recent time period is the one that includes the provided `endDate`. 

The least recent period is determined based on the organization's fiscal year settings and on the least recent journal entry that the organization has recorded. If the organization has no journal entries recorded, this endpoint will return an empty list.

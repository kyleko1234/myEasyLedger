### Get Date Range Presets for Generating Reports for Organization Up To Date

Endpoint: `GET /organization/{organizationId}/dateRangePresetsUpToDate/{endDate}`

Authorization: Requester must have view permissions.

Returns a list of fiscal year date range presets for the given organization. Each preset has the following format: 
```json
{
	"name": "FY2021",
	"prevPeriodEndDate": "2020-12-31",
	"startDate": "2021-01-01",
	"endDate": "2021-06-21"
}
```

Objects are returned in order from most recent to least recent. The most recent 'fiscal year' period will end on the given `endDate` in the url path rather than on the normal end date of the fiscal year. 

The least recent fiscal year is determined based on the organization's fiscal year settings and on the least recent journal entry that the organization has recorded. If the organization has no journal entries recorded, this endpoint will return an empty list.

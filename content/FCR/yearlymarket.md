# FCR Yearly Market
Additionally to the FCR hourly market, Fingrid procures FCR reserves from the yearly market. The below table describes the differences between hourly and yearly markets. Each FCR product - FCR-N, FCR-D up, and FCR-D down, have their own hourly and yearly markets. The technical requirements are the same between markets.

| Attribute | Yearly market | Hourly market |
|-----------|-------------|-------------|
| Participation | Tendering held once a year, can't join mid-year | Can join mid-year as soon as technical requirements met |
| Procurement | Fingrid purchases the full planned amount according to the planned resources sent | Required amount of bids accepted in price order |
| Gate closure time for plan/bid submission | Every day 18:00 | Every day 18:30 |
| Capacity | BSP must maintain their approved capacity | BSP can submit bids for their capacity daily.<br>Note: BSPs participating in the yearly market can only participate in the hourly market after maintaining their capacity in the yearly market. |
| Pricing | Price determined for the whole year, determined by the highest accepted yearly bid | Price determined for every hour, determined by the highest accepted bid for the hour |

## Planned Resource Document
BSPs can submit Planned Resource Documents to the FCR yearly market for the next day, for which the TSO is obligated to enumerate the BSP up to the contracted amount.
### Validation rules
* Recommended maximum time interval of the Planned Resource Schedule document is 30 days.
* Reserve plans for the next day must be submitted by 18:00 EE(S)T
* Revision number is always 1
* Reserve plan volume can have one decimal.
* Decimal separator must be a period.
* Document identification must be in UUID format
* EIC code shall be used as sender identification code and subject party code.
* Time stamps must be in ISO 8601 UTC format
* It is not allowed to submit reserve plans that exceed the yearly market contracted amount
### Table of document attributes
### Example message

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
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | A26 (CapacityDocument) |
| process.processType | A28 (Primary Reserve Process) |
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP) or A39 (Service Provider/Data Provider) | 
| receiver_MarketParticipant.mRID  | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| receiver_MarketParticipant.marketRole.type | A04 (System Operator) | 
| createdDateTime  | Date and time of document creation in UTC+0 <br> Format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the bid document <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| domain.mRID | EIC identification of the control area <br> For Finland **10YFI-1--------U** | 
| subject_MarketParticipant.mRID  | EIC Identification of the party responsible for the bid | 
| subject_MarketParticipant.marketRole.type | A46 (Balancing Service Provider) | 
|**Planned Resource Time Series**|
| mRID | Unique identification of the bid in UUID form |
| businessType | C26 - Frequency Containment Reserve Normal (FCR-N) or <br> C27 - Frequency Containment Reserve Disturbance (FCR-D) |
| flowDirection.direction | A01 – Up (FCR-D up) <br> A02 - Down (FCR-D down) <br> A03 – UP and DOWN (FCR-N) | 
| connecting_Domain.mRID | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| quantity_Measurement_Unit.name | Always MAW (Megawatt) |
| currency_Unit.name | Always EUR |
| price_Measurement_Unit.name | Always MAW (Megawatt) |
| marketAgreement.type | A04 (Yearly) |
| standard_MarketProduct.marketProductType | Only for FCR-D: <br> Z02 - dynamic FCR-D <br> Z03 - static FCR-D | 
| **Series_Period: Exactly one per BidTimeSeries** |
| timeInterval | The time interval of the provided schedule. <br> Must be in UTC+0. Format: YYYY-MM-DDTHH:MMZ, start and end time | 
| Resolution | PT60M or PT1H | 
| **Point** |
| Position | Running number, typically from 1 to 24 | 
| quantity.quantity | Offered quantity in megawatts | 
### Example message

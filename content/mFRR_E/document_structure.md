# Document structure
In this page you can find information about the structure and attributes of various documents related to the market. The most important message types related to the mFRR energy market are the bid document, activation document, bid availability document, reserve allocation result document, and the acknowledgement document.
## General document rules
* Dates and times should be in UTC, with the format YYYY-MM-DDThh:mm:ssZ. The last ‘Z’ stands for Zero and indicates UTC+0. The time period the document covers, however, should be in the same day in CET/CEST. This means the day is from 23:00 to 23:00 during winter time, and 22:00 to 22:00 during summer time.
* When changing from winter time to summer time, the document covers 23 hours (from 23:00 to 22:00). When changing from summer time to winter time, the document covers 25 hours (from 22:00 to 23:00).
* Each document must have a unique identifier in UUID format. 
## Bid Document
Bids are submitted to the mFRR Energy Market as *ReserveBid_MarketDocument*. Currently version 7.4 of the document is used. The document contains one or multiple Bid Time Series along with other document-wide information.
### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | Always A37 (ReserveBidDocument) |
| process.processType | Always A47 (mFRR) |
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP) or A39 (Service Provider/Data Provider) | 
| receiver_MarketParticipant.mRID  | The TSO's EIC identification | 
| receiver_MarketParticipant.marketRole.type | Always A34 (Reserve Allocator) | 
| createdDateTime  | Time of document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the bid document, same format as above, start and end time | 
| domain.mRID | EIC identification of the control area, for Finland 10YFI-1--------U | 
| subject_MarketParticipant.mRID  | EIC Identification of the party responsible for the bid | 
| subject_MarketParticipant.marketRole.type | Always A46 (BSP) | 
### Bid Time Series
The bid time series contains attributes related to individual bids. A Bid document may contain multiple Bid Time Series.
### Table of Bid Time Series attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the bid in UUID form |
| auction.mRID | Always MFRR_ENERGY_ACTIVATION_MARKET |
| businessType | Always B74 (Offer) |
| acquiring_Domain.mRID | 10Y1001A1001A91G (Nordic Market Area) |
| connecting_Domain.mRID | EIC Identification of the bidding zone, for Finland 10YFI-1--------U |
| quantity_Measurement_Unit.name | Always MAW (Megawatt) |
| currency_Unit.name | Always EUR | 
| Divisible | One of A01 (Divisible) or A02 (Indivisible) | 
| linkedBidsIdentification | Unique identification in UUID form used to associate technically linked bids | 
| multipartBidIdentification | Unique identification in UUID form used to associate multipart bids | 
| exclusiveBidsIdentification | Unique identification in UUID form used to associate exclusive bid groups | 
| InclusiveBidsIdentification | Unique identification in UUID form used to associate inclusive/aggregated bid groups | 
| Status | A06 (Available) if bid has no conditional links. For bids with conditional links, either A65 (Conditionally available, i.e. available until condition is met) or A66 (Conditionally unavailable, i.e. unavailable until condition is met) depending on the condition. | 
| registeredResource.mRID | RO Code of the resource providing object | 
| flowDirection.direction | One of A01 (Up) or A02 (Down) | 
| energyPrice_Measurement_Unit.name | MWH (Megawatt hour) | 
| standard_MarketProduct.marketProductType | A05 if bid is available for scheduled activation only. A07 if bid is available for both scheduled and direct activation. | 
| **Series_Period: Exactly one per BidTimeSeries** |
| timeInterval  | Start and end times for the bid's validity period. Must be 15 minutes and in UTC+0. Format: YYYY-MM-DDTHH:MMZ | 
| Resolution | Always PT15M for 15 minutes | 
| **Point: Exactly one per BidTimeSeries** |
| Position | Always 1 | 
| quantity.quantity | Offered quantity in megawatts | 
| energy_Price.amount | Offered price in euros | 
| minimum_Quantity.quantity | Minimum offered quantity in megawatts if activated. Cannot be used for indivisible bids. If bid is divisible, the value can be 0 for fully divisible bids but must not exceed the bid's maximum quantity. | 
| **Linked_BidTimeSeries (associated with BidTimeSeries) - no more than three instances referring to each of MTU-1 and MTU-2, respectively** |
| mRID | Unique identification of a bid in QH-1 or QH-2 |
| status | The type of the conditional link used, also determines if the **status** value shall be A65 or A66. See the below table for a list of conditional link types used in Finland. |
### Conditional link types
| Code | Conditionally unavailable or available? | Description |
|-----------|-------------|-------------|
| A55 | Available (status = A65) | Not available if linked bid activated |
| A56 | Available (status = A65) | Not available if linked bid not activated |
| A57 | Available (status = A65) | Not available if linked bid subjected to scheduled activation (SA) |
| A58 | Available (status = A65) | Not available if linked bid subjected to direct activation (DA) |
| A59 | Available (status = A65) | Not available for DA if linked bid subjected to DA |
| A60 | Available (status = A65) | Not available for DA if linked bid subjected to SA |
| A67 | Unavailable (status = A66) | Available if linked bid activated |
| A68 | Unavailable (status = A66) | Available if linked bid not activated |
| A69 | Unavailable (status = A66) | Available if linked bid subjected to SA |
| A70 | Unavailable (status = A66) | Available if linked bid subjected to DA |
### Example message
## Activation Document
Every 15 minutes, activation orders are sent for bids selected for scheduled activation (SA) as an *Activation_MarketDocument*. Bids can also be selected for direct activation (DA) between QH-7.5 and QH+6 minutes. A single Activation Document may contain activation orders for one or multiple bids. 

The BSP receiving activation messages sends an acknowledgement document to confirm the activation order has been received. Additionally, the BSP sends an activation response message as an *Activation_MarketDocument* to confirm whether the activation orders can or cannot be fulfilled.
### Table of document attributes
### Example message
## Availability Document
After the 15-minute market period ends, an Availability Document is sent to the BSPs containing the bids that had been unavailable in the MTU, along with reasons why they were set as unavailable. Additionally, if a BSP causes an invalid conditional link by cancelling a linked bid, they will be immediately notified of such unavailabilities with an Availability Document.
### Table of document attributes
### Example message
## Reserve Allocation Result Document
After each imbalance settlement period (ISP), BSPs receive a report of every bid activated as a *ReserveAllocationResult_MarketDocument.*
### Table of document attributes
### Example message
## Acknowledgement Document
BSPs receive an Acknowledgement Document for every Bid Document they send to the TSO. Additionally, BSPs send an Acknowledgement Document of their own in response to activation orders.
### Table of document attributes
### Example message

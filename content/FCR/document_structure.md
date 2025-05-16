# Document structure

On this page you can find information about the structure and attributes of various documents related to the FCR hourly market. The most important message types related to the FCR hourly market are the bid document, reserve allocation result document, and the acknowledgement document. FCR yearly market is described separately here (linkki tähän)

## General document rules
* Dates and times should be in UTC, with the format YYYY-MM-DDThh:mm:ssZ. The last ‘Z’ stands for Zero and indicates UTC+0. The time period the document covers, however, should be in the same day in CET/CEST. This means the day is from 23:00 to 23:00 during winter time, and 22:00 to 22:00 during summer time.
* When changing from winter time to summer time, the document covers 23 hours (from 23:00 to 22:00). When changing from summer time to winter time, the document covers 25 hours (from 22:00 to 23:00).
* Each document must have a unique identifier in UUID format.

* ## Bid Document
Bids are submitted to the mFRR Energy Market as *ReserveBid_MarketDocument*. Currently version 7.4 of the document is used. The document contains one or multiple Bid Time Series along with other document-wide information.

### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | A24 (BidDocument) |
| process.processType | A52 (Frequency Containment Reserve) |
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP) or A39 (Service Provider/Data Provider) | 
| receiver_MarketParticipant.mRID  | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| receiver_MarketParticipant.marketRole.type | A04 (System Operator) | 
| createdDateTime  | Date and time of document creation in UTC+0 <br> Format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the bid document <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| domain.mRID | EIC identification of the control area <br> For Finland **10YFI-1--------U** | 
| subject_MarketParticipant.mRID  | EIC Identification of the party responsible for the bid | 
| subject_MarketParticipant.marketRole.type | A46 (Balancing Service Provider) | 
### Bid Time Series
The bid time series contains attributes related to individual bids. A Bid document may contain multiple Bid Time Series. For multiple bids or periods in a message, create a timeseries for
each bid.

### Table of Bid Time Series attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the bid in UUID form |
| auction.mRID | Always FCR |
| businessType | C26 - Frequency Containment Reserve Normal (FCR-N) or <br> C27 - Frequency Containment Reserve Disturbance (FCR-D) |
| acquiring_Domain.mRID | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| connecting_Domain.mRID | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| quantity_Measurement_Unit.name | Always MAW (Megawatt) |
| currency_Unit.name | Always EUR |
| price_Measurement_Unit.name | Always MAW (Megawatt) |
| Divisible | A01 (Divisible) | 
| linkedBidsIdentification | Optional 1-10 Aggregation number, only aggregated FCR-N | 
| multipartBidIdentification | Not used |
| exclusiveBidsIdentification | Not used |
| blockBid | A02 (No) |
| registeredResource.mRID | For FCR-N: <br> Regulation object code. This is defined by Fingrid based on the BRP of the reserve site. Information is not mandatory. <br> For FCR-D up: <br> One of the following options, depending on the asset - **Kulutus** (consumption) / **Tuotanto** (Production) / **Aggregoitu** (Aggregated) <br> For FCR-D down: <br> Not used | 
| flowDirection.direction | A01 – Up (FCR-D up) <br> A02 - Down (FCR-D down) <br> A03 – UP and DOWN (FCR-N) | 
| marketAgreement.type | A13 (hourly) |
| standard_MarketProduct.marketProductType | Only for FCR-D: <br> Z02 - dynamic FCR-D <br> Z03 - static FCR-D | 
| **Series_Period: Exactly one per BidTimeSeries** |
| timeInterval | The hour of the bid in question, the time interval can be only one hour. <br> Must be in UTC+0. Format: YYYY-MM-DDTHH:MMZ, start and end time | 
| Resolution | PT60M or PT1H | 
| **Point: Exactly one per BidTimeSeries** |
| Position | Always 1 | 
| quantity.quantity | Offered quantity in megawatts | 
| energy_Price.amount | Offered price in euros | 

# Document structure
In this page you can find information about the structure and attributes of various documents related to the market. For the aFRR energy market, the most important message types are the bid document, the bid availability document and the acknowledgement document.
## General document rules
* Dates and times should be in UTC, with the format YYYY-MM-DDThh:mm:ssZ. The last ‘Z’ stands for Zero and indicates UTC+0. The time period the document covers, however, should be in the same day in **CET/CEST**. This means the day is from 23:00 to 23:00 during winter time, and 22:00 to 22:00 during summer time.
* When changing from winter time to summer time, the document covers 23 hours (from 23:00 to 22:00). When changing from summer time to winter time, the document covers 25 hours (from 22:00 to
23:00). 
* Each document must have an unique identifier in UUID format. The document revision number is always 1.
* One document may contain at most 2000 time series. If you want to submit more than that, they must be split into multiple messages.
## Bid document
aFRR energy bids are submitted to the market as a *ReserveBid_MarketDocument*. Currently the version 7.4 of the document is used. The document contains one or multiple Bid Time Series, along with other document-wide information.
### Table of bid document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | Always A37 (ReserveBidDocument) |
| process.processType | Always A51 (afRR) |
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP) or A39 (Service Provider/Data Provider) | 
| receiver_MarketParticipant.mRID  | The TSO's EIC identification | 
| receiver_MarketParticipant.marketRole.type | Always A04 (TSO) | 
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
| businessType | Always B74 (Offer) |
| acquiring_Domain.mRID | 10Y1001A1001A91G (Nordic Market Area) |
| connecting_Domain.mRID | EIC Identification of the bidding zone, for Finland 10YFI-1--------U |
| quantity_Measurement_Unit.name | Always MAW (Megawatt) |
| currency_Unit.name | Always EUR | 
| Divisible | A01 if divisible, meaning the bid can be partially activated | 
| Status | Always A06 (Available) | 
| flowDirection.direction | One of A01 (Up) or A02 (Down) | 
| energyPrice_Measurement_Unit.name | MWH (Megawatt hour) | 
| standard_MarketProduct.marketProductType | Always A01 (Standard product) | 
| **Series_Period: Exactly one per BidTimeSeries** |
| timeInterval  | Start and end times for the bid's validity period. Must be 15 minutes and in UTC+0. Format: YYYY-MM-DDTHH:MMZ | 
| Resolution | Always PT15M for 15 minutes | 
| **Point: Exactly one per BidTimeSeries** |
| Position | Always 1 | 
| quantity.quantity | Offered quantity in megawatts | 
| energy_Price.amount | Offered price in euros | 
### Example message
## Availability document
Availability documents are sent one minute after the bid availability period has ended. BSPs receive one if the bid has been set to partially or completely unavailable during the market period. If the bid was available, no availability document will be sent, as bids are available by default. The availability document will include a reason code for every unavailable bid, accompanied by a description text.
| Reason Code | Description | Use case |
|-----------|-------------|-------------|
| B16 | Tender unavailable in merit order list (MOL) | Unavailability due to conditional links |
| B18 | Failure | Unavailable either due to the BSP's request or due to a faulty bid |
| B09 | Bid not accepted | - |
| B58 | Insufficient reserves | Unavailability due to TSO request |
| B59 | Unavailability of reserve providing units | Real time connection with BSP lost |
### Table of Availability document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the bid in UUID form |
| revisionNumber | Always 1 |
| Type | Always B45 (Availability document) |
| process.processType | Always A51 (afRR) |
| sender_MarketParticipant.mRID  | The TSO's EIC identification | 
| sender_MarketParticipant.marketRole.type | Always A04 (TSO) | 
| receiver_MarketParticipant.mRID | Identification of the receiving party |
| receiver_MarketParticipant.marketRole.type | One of A46 (BSP) or A39 (Service Provider/Data Provider) | 
| createdDateTime  | Time of document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the bid document, same format as above, start and end time | 
| **BidTimeSeries: one or more instances** |
| mRID | Unique identification of the bid in UUID form |
| bidDocument_MarketDocument.mRID | Always NA |
| bidDocument_MarketDocument.revisionNumber | Always 1 |
| requestingParty_MarketParticipant.mRID | EIC code of the party requesting bid availability update |
| requestingParty_MarketParticipant.marketRole.type | One of A46 (BSP) or A49 (TSO) |
| businessType | One of C40 (Conditional bid), C41 (Thermal limit), or C42 (Frequency limit) |
| domain.mRID | Unique identification of the bid in UUID form |
### Example message
## Acknowledgement document
A bid is submitted to the market once the bid document has been acknowledged with a positive acknowledgement document. The acknowledgement document is never partially positive, documents are always either fully rejected or fully accepted. The document contains the offending time series in case of rejection accompanied with a reason code and text.
### Table of Acknowledgement document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the bid in UUID form |
| createdDateTime  | Time of document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP), A39 (Service Provider/Data Provider), or A04 (TSO) | 
| receiver_MarketParticipant.mRID | Identification of the receiving party |
| receiver_MarketParticipant.marketRole.type | One of A46 (BSP), A39 (Service Provider/Data Provider), or A04 (TSO) | 
| received_MarketDocument.mRID | Unique identification of the received document in UUID form |
| received_MarketDocument.revisionNumber | Revision number of the received document, always 1 |
| received_MarketDocument.Type | Type of received document, always A37 (ReserveBidDocument) |
| received_MarketDocument.process.processType | Process type of received document, always A51 (afRR) |
| received_MarketDocument.createdDateTime  | Time of received document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| **Document level Reason: one or more instances per document** |
| code | One of A01 (Accepted) or A02 (Rejected) | 
| text | Free text field, may be populated with an error message | 
| **Bid level Reason: zero or more instances per erroneous bid time series** |
| code | 999 - Error not specifically identified. Other error codes may be used. | 
| text | Free text field, may be populated with an error message for a bid causing the acknowledgement document to be negative. | 
### Example message

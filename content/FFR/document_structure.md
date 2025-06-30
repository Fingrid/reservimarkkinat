# Document structure

On this page you can find information about the structure and attributes of various documents related to the FFR market. The most important message types related to the FFR market are the bid document, reserve allocation result document, and the acknowledgement document.

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
| process.processType | Z14 (Fast Frequency Reserve) |
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP) or A45 (Service Provider/Data Provider) | 
| receiver_MarketParticipant.mRID  | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| receiver_MarketParticipant.marketRole.type | A04 (System Operator) | 
| createdDateTime  | Date and time of document creation in UTC+0 <br> Format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the bid document <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| domain.mRID | EIC identification of the control area <br> For Finland **10YFI-1--------U** | 
| subject_MarketParticipant.mRID  | EIC Identification of the party responsible for the bid | 
| subject_MarketParticipant.marketRole.type | A46 (Balancing Service Provider) | 
### Bid Time Series
The bid time series contains attributes related to individual bids. A Bid document may contain multiple Bid Time Series. For multiple bids or periods in a message, create a timeseries for
each bid. When submitting FFR-FCR combination bids, the FCR bids will use the structure of FCR Bid Time Series, described in the [FCR Document Structure page](../FCR/document_structure.md).
### Table of Bid Time Series attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the bid in UUID form |
| auction.mRID | FFR |
| businessType | Z85 - FFR |
| acquiring_Domain.mRID | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| connecting_Domain.mRID | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| quantity_Measurement_Unit.name | Always MAW (Megawatt) |
| currency_Unit.name | Always EUR |
| price_Measurement_Unit.name | Always MAW (Megawatt) |
| Divisible | A02 (Indivisible) | 
| exclusiveBidsIdentification | Optional. UUID identifier used when linking FFR and FCR bids together. |
| registeredResource.mRID | For FFR: <br> One of the following options, depending on the asset - **Kulutus** (consumption) / **Tuotanto** (Production) / **Aggregoitu** (Aggregated) | 
| flowDirection.direction | Always A01 (Up) | 
| **Series_Period: Exactly one per BidTimeSeries** |
| timeInterval | The hour of the bid in question, the time interval can be only one hour. <br> Must be in UTC+0. Format: YYYY-MM-DDTHH:MMZ, start and end time | 
| Resolution | PT60M or PT1H | 
| **Point: Exactly one per BidTimeSeries** |
| Position | Always 1 | 
| quantity.quantity | Offered quantity in megawatts | 
| energy_Price.amount | Offered price in euros | 
### Example message
## Reserve Allocation Result Document
The Reserve Allocation Result document is a report sent to the BSP after the MTU containing information of the price and volume of activations during the MTU. No reference to the actual bids is included in the document; Per-bid results are sent in a separate document. The message is only sent if the receiving BSP has submitted bids that day. The FFR allocation document does not contain information of FCR parts of combination bids.
### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | A38 (Reserve Allocation Result) |
| process.processType | Z14 (Fast Frequency Reserve) |
| sender_MarketParticipant.mRID  | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| sender_MarketParticipant.marketRole.type | A04 (System Operator) | 
| receiver_MarketParticipant.mRID | Identification of the sender party |
| receiver_MarketParticipant.marketRole.type | One of A46 (BSP) or A39 (Service Provider/Data Provider) | 
| createdDateTime  | Date and time of document creation in UTC+0 <br> Format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the document <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| domain.mRID | EIC identification of the control area <br> For Finland **10YFI-1--------U** | 
| **Allocation Time Series** |
| Time Series Identification | Unique identification of the time series in UUID form |
| Bid Document Identification | NA |
| Bid Document Version | Always 1 | 
| Reserve Bid Identification | NA |
| Tendering Party | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| Auction Identification | FFR | 
| businessType | Z85 - FFR |
| acquiring Area | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| connecting Area | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| Contract Type | A01 - Daily |
| Contract Identification | NA |
| Measure Unit Quantity | Always MAW (Megawatt) |
| Currency | Always EUR |
| Measure Unit Quantity | Always MAW (Megawatt) |
| Direction | A01 - Up |
| **Period** |
| Time Interval | Time period covered in the document, one complete spot day <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| Resolution | PT60M or PT1H | 
| **Interval** |
| Pos | Relative position within a reserve bid interval |
| Quantity | Accepted quantity in megawatts | 
| Price | Hour's marginal price | 
### Table of per-bid document attributes
The per-bid document has a similar structure to normal reserve allocation result documents, the only differences being in the Allocation Time Series.
| Attribute | Description |
|-----------|-------------|
| **Allocation Time Series** |
| Time Series Identification | Unique identification of the time series in UUID form |
| Bid Document Identification | **Original Bid ID** |
| Bid Document Version | Always 1 | 
| Reserve Bid Identification | NA |
| Tendering Party | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| Auction Identification | FFR_CAPACITY_MARKET | 
| businessType | Z85 - FFR |
| acquiring Area | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| connecting Area | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| Contract Type | A01 - Daily |
| Contract Identification | NA |
| Measure Unit Quantity | Always MAW (Megawatt) |
| Currency | Always EUR |
| Measure Unit Quantity | Always MAW (Megawatt) |
| Direction | A01 - Up |
| **Reason** |
| **code** | **One of A73 (Bid accepted), A72 (Bid partially accepted), or B09 (Bid not accepted)** |
| **Period** |
| Time Interval | Time period covered in the document, one complete spot day <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| Resolution | PT60M or PT1H | 
| **Interval** |
| **Position** | **1** |
| Quantity | Accepted quantity in megawatts | 
| Price | Hour's marginal price | 
| **Secondary Quantity** | **Original volume of the bid** | 
| **Secondary Price** | **Original price of the bid** | 
### Example messages
## Acknowledgement Document
For every message detailed in this page, an acknowledgement document should be generated and sent back by the receiving party to indicate that the message has been successfully received. The document can be either positive (code A01) or negative (A02).
### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the bid in UUID form |
| createdDateTime  | Time of document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | One of A46 (BSP), A27 (Resource Provider), A34 (Reserve Allocator) or A04 (TSO) | 
| receiver_MarketParticipant.mRID | Identification of the receiving party |
| receiver_MarketParticipant.marketRole.type | One of A46 (BSP), A27 (Resource Provider), or A04 (TSO) | 
| received_MarketDocument.mRID | Unique identification of the received document in UUID form |
| received_MarketDocument.revisionNumber | Revision number of the received document |
| received_MarketDocument.Type | Type of received document |
| received_MarketDocument.process.processType | Process type of received document |
| received_MarketDocument.createdDateTime  | Time of received document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| **Document level Reason: one or more instances per document** |
| code | One of A01 (Accepted) or A02 (Rejected) | 
| text | Free text field, may be populated with an error message | 
| **Bid level Reason: zero or more instances per erroneous bid time series** |
| code | 999 - Error not specifically identified. Other error codes may be used. | 
| text | Free text field, may be populated with an error message for a bid causing the acknowledgement document to be negative. | 
### Example messages
These are two examples of an acknowledgement for bid documents: One positive and one negative.
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Acknowledgement_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-1:acknowledgementdocument:8:1"> <!--Schema version 8.1-->
  <mRID>efbeef04-46d8-4bc6-b544-8e8df6553ab7</mRID>
  <createdDateTime>2025-04-08T12:31:39Z</createdDateTime> <!--Time and date in UTC+0-->
  <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!--Fingrid's ID-->
  <sender_MarketParticipant.marketRole.type>A34</sender_MarketParticipant.marketRole.type> <!--Type Reserve Allocator-->
  <receiver_MarketParticipant.mRID codingScheme="A01">----------------</receiver_MarketParticipant.mRID> <!--Receiver's ID-->
  <received_MarketDocument.mRID>7a963d8f-7547-41e5-9bbc-52976f877383</received_MarketDocument.mRID> <!--ID of the document being acknowledged-->
  <received_MarketDocument.revisionNumber>1</received_MarketDocument.revisionNumber>
  <received_MarketDocument.createdDateTime>2025-04-08T12:31:34Z</received_MarketDocument.createdDateTime> 
  <Reason>
    <code>A01</code> <!--Positive ACK-->
  </Reason>
</Acknowledgement_MarketDocument>
```
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Acknowledgement_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-1:acknowledgementdocument:8:1" <!--Schema version 8.1-->
	<mRID>94fbd3a4-8b59-483c-b9e8-f03b366abb2a</mRID>
	<createdDateTime>2025-04-03T16:15:13Z</createdDateTime> <!--Time and date in UTC+0-->
	<sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!--Fingrid's ID-->
	<sender_MarketParticipant.marketRole.type>A34</sender_MarketParticipant.marketRole.type> <!--Type Reserve Allocator-->
	<receiver_MarketParticipant.mRID codingScheme="A01">----------------</receiver_MarketParticipant.mRID> <!--Receiver's ID-->
	<received_MarketDocument.mRID>1aeddd9a-c522-49a2-be20-3822d7d972be</received_MarketDocument.mRID> <!--ID of the document being acknowledged-->
	<received_MarketDocument.revisionNumber>1</received_MarketDocument.revisionNumber>
	<received_MarketDocument.createdDateTime>2025-04-03T16:13:39Z</received_MarketDocument.createdDateTime>
	<Reason>
		<code>A02</code> <!--Negative ACK-->
		<text>Message was received after deadline, GateClosure.</text> <!--Explanation-->
	</Reason>
</Acknowledgement_MarketDocument>
```

# Document structure

On this page you can find information about the structure and attributes of various documents related to the FCR hourly market. The most important message types related to the FCR hourly market are the bid document, reserve allocation result document, and the acknowledgement document. FCR yearly market uses its own Planned Schedule document, the structure of which is described separately [here](./yearlymarket.md).

## General document rules
* Dates and times should be in UTC, with the format YYYY-MM-DDThh:mm:ssZ. The last ‘Z’ stands for Zero and indicates UTC+0. The time period the document covers, however, should be in the same day in CET/CEST. This means the day is from 23:00 to 23:00 during winter time, and 22:00 to 22:00 during summer time.
* When changing from winter time to summer time, the document covers 23 hours (from 23:00 to 22:00). When changing from summer time to winter time, the document covers 25 hours (from 22:00 to 23:00).
* Each document must have a unique identifier in UUID format.

## Bid Document
Bids are submitted to the FCR Hourly Market as *ReserveBid_MarketDocument*. Currently version 7.4 of the schema is used. The document contains one or multiple Bid Time Series along with other document-wide information.

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
The bid time series contains attributes related to individual bids. A Bid document may contain multiple Bid Time Series. For multiple bids or periods in a message, create a timeseries for each bid. It is also possible to submit FCR bids as combination bids alongside FFR bids as part of FFR bid documents. When submitting FFR-FCR combination bids, the FFR bids will use the structure of FFR Bid Time Series, described in the [FFR Document Structure page](../FFR/document_structure.md).

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
### Example message
The example message contains an FCR-N bid.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ReserveBid_MarketDocument xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="urn:iec62325.351:tc57wg16:451-7:reservebiddocument:7:4" <!--ReserveBidDocument schema version 7.4-->
	<mRID>7fd5112e-927b-483b-8f56-8057a2a16666</mRID>
	<revisionNumber>1</revisionNumber>
	<type>A24</type> <!--ReserveBidDocument-->
	<process.processType>A52</process.processType> <!--FCR-->
	<sender_MarketParticipant.mRID codingScheme="A01">-------------</sender_MarketParticipant.mRID> <!--Sender's ID-->
	<sender_MarketParticipant.marketRole.type>A46</sender_MarketParticipant.marketRole.type> <!--Type BSP-->
	<receiver_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</receiver_MarketParticipant.mRID> <!--Fingrid'S ID-->
	<receiver_MarketParticipant.marketRole.type>A04</receiver_MarketParticipant.marketRole.type> <!--Type TSO-->
	<createdDateTime>2025-06-29T14:30:57Z</createdDateTime> <!--Time and date in UTC+0-->
	<reserveBid_Period.timeInterval> <!--Time period of the document, all bids must fall within this period-->
		<start>2025-06-30T01:00Z</start>
		<end>2025-06-30T02:00Z</end>
	</reserveBid_Period.timeInterval> 
	<domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!--Finland's domain code-->
	<subject_MarketParticipant.mRID codingScheme="A01">-------------</subject_MarketParticipant.mRID> <!--Subject i.e. responsible BSP's ID--> 
	<subject_MarketParticipant.marketRole.type>A46</subject_MarketParticipant.marketRole.type> <!--Type BSP-->
	<Bid_TimeSeries>
		<mRID>3490160eaf394fdda4ec7a20a40b2666</mRID> <!--Unique UUID for new bids, existing UUID for bid updates-->
		<auction.mRID>FCR</auction.mRID>
		<businessType>C26</businessType> <!--FCR-N-->
		<acquiring_Domain.mRID codingScheme="A01">10YFI-1--------U</acquiring_Domain.mRID> <!--Finland's domain code-->
		<connecting_Domain.mRID codingScheme="A01">10YFI-1--------U</connecting_Domain.mRID> <!--Finland's domain code-->
		<quantity_Measurement_Unit.name>MAW</quantity_Measure_Unit.name> 
		<currency_Unit.name>EUR</currency_Unit.name>
		<price_Measurement_Unit.name>MAW</price_Measure_Unit.name>
		<divisible>A01</divisible> <!--Divisible bid (Mandatory for FCR)-->
		<exclusiveBidsIdentification>1175020fbcd54756b8d1a2b4e566654c</exclusiveBidsIdentification> <!--Used if part of an FFR-FCR combination bid. FFR part not listed in this example.-->
		<flowDirection.direction>A03</flowDirection.direction> <!--Up and down direction, mandatory for FCR-N-->
		<marketAgreement.type>A13/marketAgreement.type> <!--Hourly-->
		<Period>
			<timeInterval> <!--Time period of the bid-->
				<start>2025-06-30T01:00Z</start>
				<end>2025-06-30T02:00Z</end>
			</timeInterval>
			<resolution>PT60M</resolution>
			<Point>
				<position>1</position>
				<quantity.quantity>1.0</quantity.quantity>
				<price.amount>23.49</price.amount>
			</Point>
		</Period>
	</Bid_TimeSeries>
</ReserveBid_MarketDocument>
```
## Reserve Allocation Result Document
The Reserve Allocation Result document is a report sent to the BSP after the MTU containing information of the price and volume of activations during the MTU. No reference to the actual bids is included in the document; Per-bid results are sent in a separate document. The message is only sent if the receiving BSP has submitted bids that day. The FFR allocation document does not contain information of FCR parts of combination bids.
### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | A38 (Reserve Allocation Result) |
| process.processType | A28 (Primary reserve process) |
| sender_MarketParticipant.mRID  | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| sender_MarketParticipant.marketRole.type | A11 (Market Operator) | 
| receiver_MarketParticipant.mRID | Identification of the sender party |
| receiver_MarketParticipant.marketRole.type | A12 (BSP) | 
| createdDateTime  | Date and time of document creation in UTC+0 <br> Format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the document <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| domain.mRID | EIC identification of the control area <br> For Finland **10YFI-1--------U** | 
| **Allocation Time Series** |
| Time Series Identification | Unique identification of the time series in UUID form |
| Bid Document Identification | NA |
| Bid Document Version | Always 1 | 
| Reserve Bid Identification | NA |
| Tendering Party | The TSO's EIC identification <br> Fingrid = **10X1001A1001A264** | 
| Auction Identification | FCR | 
| businessType | Z03 for FCR-N, Z06 for FCR-D |
| acquiring Area | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| connecting Area | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| Contract Type | A01 - Daily |
| Contract Identification | NA |
| Measure Unit Quantity | Always MAW (Megawatt) |
| Currency | Always EUR |
| Measure Unit Quantity | Always MAW (Megawatt) |
| Direction | For FCR-N: A03 - Up and down<br>For FCR-D A01 - Up or A02 - Down |
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
| Auction Identification | FCR_CAPACITY_MARKET | 
| businessType | C26 for FCR-N, C27 for FCR-D |
| acquiring Area | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| connecting Area | EIC identification of the national area <br> For Finland **10YFI-1--------U** |
| Contract Type | A01 - Daily |
| Contract Identification | NA |
| Measure Unit Quantity | Always MAW (Megawatt) |
| Currency | Always EUR |
| Measure Unit Quantity | Always MAW (Megawatt) |
| Direction | If businessType = C26: A03 - Up and down<br>If businessType = C27 A01 - Up or A02 - Down |
| **Reason** |
| **code** | **One of A73 (Bid accepted), A72 (Bid partially accepted), or B09 (Bid not accepted)** |
| **Period** |
| Time Interval | Time period covered in the document, one complete spot day <br> Format: YYYY-MM-DDTHH:MMZ <br> start and end time | 
| Resolution | PT60M or PT1H | 
| **Interval** |
| **Position** | **1** |
| Quantity | Accepted quantity in megawatts | 
| Price | Hour's marginal price | 
| Secondary Quantity | Original volume of the bid | 
| Bid Price | Original price of the bid | 
### Example messages
These are example messages for both types of Reserve Allocation Result documents.
> [!NOTE]
> 
> The different Reserve Allocation Result documents are currently using different schema versions and xml formats.
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ReserveAllocationResultDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:entsoe.eu:wgedi:errp:reserveallocationresultdocument:5:0"> <!--ReserveAllocationResultDocument schema version 5.0-->
  <DocumentIdentification v="3984c3680a4a4858b88d9f9f9d928444" />
  <DocumentVersion v="1" />
  <DocumentType v="A38" /> <!--ReserveAllocationResultDocument-->
  <ProcessType v="A28" /> <!--Primary reserve process-->
  <SenderIdentification v="10X1001A1001A264" codingScheme="A01" /> <!--Fingrid'S ID-->
  <SenderRole v="A11" /> <!--Type Market Operator-->
  <ReceiverIdentification v="--------------" codingScheme="A01" /> <!--Receiver'S ID-->
  <ReceiverRole v="A12" /> <!--Type BSP-->
  <CreationDateTime v="2025-06-29T15:06:16Z" /> <!--Time and date in UTC+0-->
  <ReserveBidTimeInterval v="2025-06-29T22:00Z/2025-06-30T22:00Z" /> <!--Time period of the document, always a full CE(S)T day-->
  <Domain v="10YFI-1--------U" codingScheme="A01" /> <!--Finland's domain code-->
  <AllocationTimeSeries>
    <TimeSeriesIdentification v="a28866ebb3074588b50a3851836a4000" />
    <ReserveBidDocumentIdentification v="NA" />
    <ReserveBidDocumentVersion v="1" />
    <ReserveBidIdentification v="NA" />
    <TenderingParty v="10X1001A1001A264" codingScheme="A01" /> <!--Fingrid's ID-->
    <AuctionIdentification v="FCR" />
    <BusinessType v="Z03" /> <!--FCR-N-->
    <AcquiringArea v="10YFI-1--------U" codingScheme="A01" /> <!--Finland's domain code-->
    <ConnectingArea v="10YFI-1--------U" codingScheme="A01" /> <!--Finland's domain code-->
    <ContractType v="A01" /> <!--Daily-->
    <ContractIdentification v="NA" />
    <MeasureUnitQuantity v="MAW" />
    <Currency v="EUR" />
    <MeasureUnitPrice v="MAW" />
    <Direction v="A03" /> <!--Up and down-->
    <Period>
      <TimeInterval v="2025-06-29T22:00Z/2025-06-30T22:00Z" /> <!--Time period of the document, always a full CE(S)T day-->
      <Resolution v="PT1H" />
      <Interval> <!--Accepted amounts for each hour of the day, no bid information included-->
        <Pos v="1" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="2" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="3" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="4" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="5" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="6" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="7" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="8" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="9" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="10" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="11" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="12" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="13" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="14" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="15" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="16" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="17" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="18" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="19" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="20" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="21" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="22" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="23" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
      <Interval>
        <Pos v="24" />
        <Qty v="5.0" />
        <Price v="12" />
      </Interval>
    </Period>
  </AllocationTimeSeries>
</ReserveAllocationResultDocument>
```
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ReserveAllocationResult_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-7:reserveallocationresultdocument:6:4"> <!--ReserveAllocationResultDocument schema version 6.4-->
  <mRID>1a25ff0c413345718edf7d5d7578e555</mRID>
  <revisionNumber>1</revisionNumber>
  <type>A38</type> <!--ReserveAllocationResultDocument-->
  <process.processType>A28</process.processType> <!--Primary reserve process-->
  <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!--Fingrid's ID-->
  <sender_MarketParticipant.marketRole.type>A11</sender_MarketParticipant.marketRole.type> <!--Type Market Operator-->
  <receiver_MarketParticipant.mRID codingScheme="A01">44X-00000000266I</receiver_MarketParticipant.mRID> <!--Receiver's ID-->
  <receiver_MarketParticipant.marketRole.type>A12</receiver_MarketParticipant.marketRole.type> <!--Type BSP-->
  <createdDateTime>2025-06-29T15:06:22Z</createdDateTime> <!--Time and date in UTC+0-->
  <reserveBid_Period.timeInterval>
    <start>2025-06-29T22:00Z</start> <!--Time period of the document, applies to the bids within-->
    <end>2025-06-30T22:00Z</end>
  </reserveBid_Period.timeInterval>
  <domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!--Finland's domain code-->
  <TimeSeries>
    <mRID>d1eaeef63763420ab6b124e58728bcde</mRID>
    <bid_Original_MarketDocument.bid_BidTimeSeries.mRID>21a07993-4864-42ca-e0ab-08ddb7212cbd</bid_Original_MarketDocument.bid_BidTimeSeries.mRID> <!--ID of the original bid document-->
    <bid_Original_MarketDocument.tendering_MarketParticipant.mRID codingScheme="A01">--------------</bid_Original_MarketDocument.tendering_MarketParticipant.mRID> <!--ID of the party sending the original bid-->
    <auction.mRID>FCR_CAPACITY_MARKET</auction.mRID>
    <businessType>C26</businessType> <!--FCR-N-->
    <acquiring_Domain.mRID codingScheme="A01">10YFI-1--------U</acquiring_Domain.mRID> <!--Finland's domain code-->
    <connecting_Domain.mRID codingScheme="A01">10YFI-1--------U</connecting_Domain.mRID> <!--Finland's domain code-->
    <marketAgreement.type>A01</marketAgreement.type> <!--Daily-->
    <quantity_Measurement_Unit.name>MAW</quantity_Measurement_Unit.name>
    <currency_Unit.name>EUR</currency_Unit.name>
    <price_Measurement_Unit.name>MAW</price_Measurement_Unit.name> 
    <flowDirection.direction>A03</flowDirection.direction> <!--Up and down-->
    <Period>
      <timeInterval>
        <start>2025-06-30T01:00Z</start>
        <end>2025-06-30T02:00Z</end>
      </timeInterval>
      <resolution>PT60M</resolution>
      <Point>
        <position>1</position>
        <quantity>2.4</quantity> <!--Accepted quantity-->
        <price.amount>5</price.amount> <!--Final price-->
        <secondaryQuantity>2.4</secondaryQuantity> <!--Original quantity-->
        <bid_Price.amount>0.65</bid_Price.amount> <!--Original price-->
      </Point>
    </Period>
    <Reason>
      <code>A73</code> <!--Bid fully accepted-->
    </Reason>
  </TimeSeries>
</ReserveAllocationResult_MarketDocument>
```
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

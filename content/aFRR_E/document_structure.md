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
This is an example message of a bid being submitted to the aFRR energy market.
```xml
<?xml version="1.0" encoding="utf-8"?>
<ReserveBid_MarketDocument xmlns="urn:iec62325.351:tc57wg16:451-7:reservebiddocument:7:4"> <!-- XML schema identification, must match -->
  <mRID>8a55a8bb-6d62-54ef-bc64-654321abcdef</mRID> <!-- Unique document identification -->
  <revisionNumber>1</revisionNumber>
  <type>A37</type> <!-- A37 for reserveBidDocument -->
  <process.processType>A51</process.processType> <!-- A51 for aFRR -->
  <sender_MarketParticipant.mRID codingScheme="A01">-----------</sender_MarketParticipant.mRID> <!-- The sender's EIC code -->
  <sender_MarketParticipant.marketRole.type>A46</sender_MarketParticipant.marketRole.type> <!-- A46 for BSP -->
  <receiver_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</receiver_MarketParticipant.mRID> <!-- Fingrid's EIC code -->
  <receiver_MarketParticipant.marketRole.type>A04</receiver_MarketParticipant.marketRole.type> <!-- A04 for TSO -->
  <createdDateTime>2025-03-14T08:31:03Z</createdDateTime> <!-- Time of document creation in UTC -->
  <reserveBid_Period.timeInterval> <!-- Same format as above for bid time period -->
    <start>2025-03-14T09:45Z</start>
    <end>2025-03-14T10:00Z</end>
  </reserveBid_Period.timeInterval>
  <domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!-- Finland's domain ID -->
  <subject_MarketParticipant.mRID codingScheme="A01">-----------</subject_MarketParticipant.mRID> <!-- The market participant's EIC code (can be the same as the sender) -->
  <subject_MarketParticipant.marketRole.type>A46</subject_MarketParticipant.marketRole.type> <!-- A46 for BSP -->
  <Bid_TimeSeries>
    <mRID>68a55a8bb-6d62-54ef-bc64-654321abcde</mRID> <!-- Unique bid identification -->
    <businessType>B74</businessType> <!-- B74 for offer -->
    <acquiring_Domain.mRID codingScheme="A01">10Y1001A1001A91G</acquiring_Domain.mRID> <!-- domain ID for Nordic Market Area -->
    <connecting_Domain.mRID codingScheme="A01">10YFI-1--------U</connecting_Domain.mRID> <!-- Unique document identification -->
    <quantity_Measurement_Unit.name>MAW</quantity_Measurement_Unit.name> <!-- Megawatt -->
    <currency_Unit.name>EUR</currency_Unit.name>
    <divisible>A01</divisible> <!-- A01 for fully divisible bids -->
    <status>
      <value>A06</value> <!-- A06 for available bids -->
    </status>
    <flowDirection.direction>A02</flowDirection.direction> <!-- A02 for down regulation, A01 for up -->
    <energyPrice_Measurement_Unit.name>MWH</energyPrice_Measurement_Unit.name>
    <standard_MarketProduct.marketProductType>A01</standard_MarketProduct.marketProductType> <!-- A01 for standard product -->
    <Period>
      <timeInterval> <!-- Time period where bid is valid (UTC), can differ from document time period as long as it is contained within the document time period -->
        <start>2025-03-14T09:45Z</start>
        <end>2025-03-14T10:00Z</end>
      </timeInterval>
      <resolution>PT15M</resolution> <!-- 15 minute resolution -->
      <Point>
        <position>1</position>
        <quantity.quantity>10</quantity.quantity> <!-- Bid volume in megawatts -->
        <energy_Price.amount>-15</energy_Price.amount> <!-- Bid price in EUR -->
      </Point>
    </Period>
  </Bid_TimeSeries>
</ReserveBid_MarketDocument>
```
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
This is an example of a bid availability document sent by Fingrid after a validity period has ended.
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<BidAvailability_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-n:bidavailabilitydocument:1:1">
  <mRID>fb22d5d2hcbcc623b998aaecf0a1d5f22</mRID> <!-- Unique document identification -->
  <revisionNumber>1</revisionNumber>
  <type>B45</type>
  <process.processType>A51</process.processType>
  <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!-- Fingrid's EIC code -->
  <sender_MarketParticipant.marketRole.type>A04</sender_MarketParticipant.marketRole.type> <!-- A04 for TSO -->
  <receiver_MarketParticipant.mRID codingScheme="A01">-----------</receiver_MarketParticipant.mRID> <!-- Receiver's EIC code -->
  <receiver_MarketParticipant.marketRole.type>A39</receiver_MarketParticipant.marketRole.type> <!-- A39 for Service Provider/Data Provider -->
  <createdDateTime>2025-03-14T08:01:02Z</createdDateTime> <!-- Time of document creation in UTC -->
  <time_Period.timeInterval> <!-- Same format as above for the time period covered by the document -->
    <start>2025-03-14T07:45Z</start>
    <end>2025-03-14T08:00Z</end>
  </time_Period.timeInterval>
  <BidTimeSeries>
    <mRID>b99c420d-4206-5566-bfcc-bde434bdad88</mRID> <!-- Unique bid identification -->
    <bidDocument_MarketDocument.mRID>NA</bidDocument_MarketDocument.mRID>
    <bidDocument_MarketDocument.revisionNumber>1</bidDocument_MarketDocument.revisionNumber>
    <requestingParty_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</requestingParty_MarketParticipant.mRID> <!-- EIC code of the party requesting unavailability, Fingrid in this case -->
    <requestingParty_MarketParticipant.marketRole.type>A49</requestingParty_MarketParticipant.marketRole.type> <!-- A49 for TSO -->
    <businessType>C42</businessType> <!-- C42 for frequency limit -->
    <domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!-- Finland's domain ID -->
    <Reason>
      <code>B59</code> <!-- B59 for unavailability of reserve providing units -->
      <text>Lost connection to BSP</text> <!-- More detailed reason text -->
    </Reason>
  </BidTimeSeries>
</BidAvailability_MarketDocument>
```
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
### Example messages
These are two different example acknowledgement messages: One positive, one negative.
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Acknowledgement_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-1:acknowledgementdocument:8:1">
  <mRID>ab87dff2a8ad4cc0977b408b66a6c100</mRID> <!-- Unique document identification -->
  <createdDateTime>2025-03-14T08:32:11Z</createdDateTime> <!-- Time of document creation in UTC -->
  <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!-- Fingrid's EIC code -->
  <sender_MarketParticipant.marketRole.type>A04</sender_MarketParticipant.marketRole.type> <!-- A04 for TSO -->
  <receiver_MarketParticipant.mRID codingScheme="A01">---------------</receiver_MarketParticipant.mRID> <!-- Receiver's EIC code -->
  <received_MarketDocument.mRID>632146ca657041d18e665eb14156bad</received_MarketDocument.mRID> <!-- Identification of the document this acknowledgement concerns -->
  <received_MarketDocument.revisionNumber>1</received_MarketDocument.revisionNumber> 
  <received_MarketDocument.createdDateTime>2025-03-14T08:32:09Z</received_MarketDocument.createdDateTime> <!-- Created time of the document this acknowledgement concerns -->
  <Reason>
    <code>A01</code> <!-- Positive reason code, document fully accepted -->
  </Reason>
</Acknowledgement_MarketDocument>
```
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Acknowledgement_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-1:acknowledgementdocument:8:1">
  <mRID>86d859750f734930972f-595fc95a6242</mRID> <!-- Unique document identification -->
  <createdDateTime>2025-03-14T07:05:08Z</createdDateTime> <!-- Time of document creation in UTC -->
  <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!-- Fingrid's EIC code -->
  <sender_MarketParticipant.marketRole.type>A04</sender_MarketParticipant.marketRole.type> <!-- A04 for TSO -->
  <receiver_MarketParticipant.mRID codingScheme="A01">---------------</receiver_MarketParticipant.mRID> <!-- Receiver's EIC code -->
  <received_MarketDocument.mRID>1d09394780f54a208f0eb5169a048efc</received_MarketDocument.mRID> <!-- Identification of the document this acknowledgement concerns -->
  <received_MarketDocument.revisionNumber>1</received_MarketDocument.revisionNumber>
  <received_MarketDocument.createdDateTime>2025-03-14T07:04:45Z</received_MarketDocument.createdDateTime> <!-- Created time of the document this acknowledgement concerns -->
  <Reason>
    <code>A02</code> <!-- Negative reason code, document fully rejected -->
    <text>Message was received after deadline, GateClosure.</text> <!-- Text explanation for document rejection -->
  </Reason>
</Acknowledgement_MarketDocument>
```

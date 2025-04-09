# Document structure
In this page you can find information about the structure and attributes of various documents related to the market. The most important message types related to the mFRR energy market are the bid document, activation document, bid availability document, reserve allocation result document, and the acknowledgement document. Messages are sent to the TSO's market platform via the Energy Communication Platform (ECP).
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
| A57 | Available (status = A65) | Not available for DA if linked bid subjected to direct activation (DA) |
| A58 | Available (status = A65) | Not available for DA if linked bid subjected to scheduled activation (SA) |
| A59 | Available (status = A65) | Not available if linked bid subjected to SA |
| A60 | Available (status = A65) | Not available if linked bid subjected to DA |
| A67 | Unavailable (status = A66) | Available if linked bid activated |
| A68 | Unavailable (status = A66) | Available if linked bid not activated |
| A69 | Unavailable (status = A66) | Available if linked bid subjected to SA |
| A70 | Unavailable (status = A66) | Available if linked bid subjected to DA |
> [!NOTE]
> 
> Conditional links A71 and A72 are not used in Finland.
### Example message
This is an example message of a simple, technically linked bid being submitted.
```xml
<?xml version="1.0" encoding="utf-8"?>
<ReserveBid_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-7:reservebiddocument:7:4"> <!--ReserveBidDocument schema version 7.4-->
  <mRID>32e6eff4-9262-4f6b-a954-5f9d08a37a9b</mRID>
  <revisionNumber>1</revisionNumber>
  <type>A37</type> <!--ReserveBidDocument-->
  <process.processType>A47</process.processType>
  <sender_MarketParticipant.mRID codingScheme="A01">-----------------</sender_MarketParticipant.mRID> <!--Sender's ID-->
  <sender_MarketParticipant.marketRole.type>A46</sender_MarketParticipant.marketRole.type> <!--Type BSP-->
  <receiver_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</receiver_MarketParticipant.mRID> <!--Fingrid'S ID-->
  <receiver_MarketParticipant.marketRole.type>A34</receiver_MarketParticipant.marketRole.type> <!--Type TSO-->
  <createdDateTime>2025-04-08T12:31:00Z</createdDateTime> <!--Time and date in UTC+0-->
  <reserveBid_Period.timeInterval>
    <start>2025-04-08T14:00Z</start> <!--Time period of the document, all bids must fall within this period-->
    <end>2025-04-08T18:00Z</end>
  </reserveBid_Period.timeInterval>
  <domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!--Finland's domain code-->
  <subject_MarketParticipant.mRID codingScheme="A01">----------------</subject_MarketParticipant.mRID> <!--Subject i.e. responsible BSP's ID-->
  <subject_MarketParticipant.marketRole.type>A46</subject_MarketParticipant.marketRole.type> <!--Type BSP-->
  <Bid_TimeSeries>
    <mRID>8651c1fa-8e84-4e83-a25b-59b0e17ae260</mRID> <!--Unique UUID for new bids, existing UUID for bid updates-->
    <auction.mRID>MFRR_ENERGY_ACTIVATION_MARKET</auction.mRID>
    <businessType>B74</businessType> <!--Offer-->
    <acquiring_Domain.mRID codingScheme="A01">10Y1001A1001A91G</acquiring_Domain.mRID> <!--Nordic Market Area's domain code-->
    <connecting_Domain.mRID codingScheme="A01">10YFI-1--------U</connecting_Domain.mRID> <!--Finland's domain code-->
    <quantity_Measurement_Unit.name>MAW</quantity_Measurement_Unit.name>
    <currency_Unit.name>EUR</currency_Unit.name>
    <divisible>A01</divisible> <!--Divisible bid-->
    <linkedBidsIdentification>8dfaeebd-ccf2-409a-b172-cf0e24b0b531</linkedBidsIdentification> <!--This bid is technically linked. Identification must match between linked bid time series and pass validation rules-->
    <status>
      <value>A06</value> <!--Available-->
    </status>
    <registeredResource.mRID codingScheme="NFI">RXXXXXX</registeredResource.mRID> <!--Code of the reserve object (RO)-->
    <flowDirection.direction>A02</flowDirection.direction> <!--Down regulation bid-->
    <energyPrice_Measurement_Unit.name>MWH</energyPrice_Measurement_Unit.name>
    <standard_MarketProduct.marketProductType>A07</standard_MarketProduct.marketProductType> <!--Available for both scheduled and direct activation (SA/DA)-->
    <Period>
      <timeInterval>
        <start>2025-04-08T14:00Z</start> <!--Time period of the bid, must fall within document limits-->
        <end>2025-04-08T14:15Z</end>
      </timeInterval>
      <resolution>PT15M</resolution>
      <Point>
        <position>1</position>
        <quantity.quantity>12</quantity.quantity>
        <minimum_Quantity.quantity>0</minimum_Quantity.quantity>
        <energy_Price.amount>-12</energy_Price.amount>
      </Point>
    </Period>
  </Bid_TimeSeries>
</ReserveBid_MarketDocument>
```
## Activation Document
Every 15 minutes at QH-7.5 minutes, activation orders are sent for bids selected for scheduled activation (SA) as an *Activation_MarketDocument*. Bids can also be selected for direct activation (DA) between QH-7.5 and QH+6 minutes. A single Activation Document may contain activation orders for one or multiple bids. 

The BSP receiving activation messages sends an acknowledgement document to confirm the activation order has been received. Additionally, the BSP sends an activation response message as an *Activation_MarketDocument* within two minutes *of the TSO sending the order* to confirm whether the activation orders can or cannot be fulfilled. The activation response message has a similar structure to the activation order, but some attributes are different (see table below).
> [!IMPORTANT]
> 
> BSPs are always accountable for activations after receiving the order, no matter if the response is positive or negative, or if any response is sent at all.
### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | **For the activation order:** One of A39 (Scheduled activation) or A40 (Direct activation).<br>**For the response:** always A41 (Response) |
| process.processType | Always A47 (mFRR) |
| sender_MarketParticipant.mRID | Identification of the sender party |
| sender_MarketParticipant.marketRole.type | **For the activation order:** Always A04 (Reserve Allocator).<br>**For the response:** one of A46 (BSP) or A27 (Resource Provider) | 
| receiver_MarketParticipant.mRID  | Identification of the receiving party | 
| receiver_MarketParticipant.marketRole.type | **For the activation order:** one of A46 (BSP) or A27 (Resource Provider).<br>**For the response:** Always A04 (Reserve Allocator) | 
| createdDateTime  | Time of document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| activation_Time_Period.timeInterval | Time period covered in the activation document, same format as above, start and end time.<br>End time varies between scheduled and direct activations; Scheduled activations last until the end of the bid's MTU, direct activations last until the end of the **next** MTU. | 
| domain.mRID | EIC identification of the control area, for Finland 10YFI-1--------U | 
| subject_MarketParticipant.mRID  | EIC Identification of the party responsible for the bid | 
| subject_MarketParticipant.marketRole.type | Always A46 (BSP) | 
| order_MarketDocument.mRID  | Unique identification of the activation order in UUID form. Same ID used in both the order and response. | 
| order_MarketDocument.revisionNumber  | Version of the activated order, incrementing by one for each time the document is sent. Same version number for both the order and response. | 
| **TimeSeries: one or more per document** |
| mRID | Unique identification of the bid to be activated in UUID form |
| businessType | Always B97 (mFRR) |
| acquiring_Domain.mRID | 10Y1001A1001A91G (Nordic Market Area) |
| connecting_Domain.mRID | EIC Identification of the bidding zone, for Finland 10YFI-1--------U |
| measurement_Unit.name | Always MAW (Megawatt) |
| flowDirection.direction | One of A01 (Up) or A02 (Down) | 
| marketObjectStatus.status | **In the activation order:** A10 (Ordered).<br>**In the response:** One of A07 (Activated) or A11 (Unavailable) | 
| registeredResource.mRID | RO Code of the resource providing object | 
| **Series_Period: Exactly one per TimeSeries** |
| timeInterval  | Start and end times for the bid's activation period. Must be in UTC+0. Format: YYYY-MM-DDTHH:MMZ | 
| Resolution | Must match the activation time. Examples: PT15M for scheduled activation, PT24M for a 24 minute direct activation. | 
| **Point: Exactly one per TimeSeries** |
| Position | Always 1 | 
| quantity.quantity | Activated quantity in megawatts | 
| **Reason: Exactly one per BidTimeSeries** |
| code | **In the activation order:** One of B22 (System regulation) or B49 (Balancing).<br>**In the response:** Only used to provide a reason when the bid is unavailable. i.e. marketObjectStatus.status = A11. In that case, one of B59 (Unavailability of reserve providing unit) or 999 (Unspecified error). | 
| text  | Not used in the activation order. <br>**In the response,** used to provide further reasoning for unavailability. | 
### Example message
This is an example of a scheduled activation order being sent to the BSP.
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Activation_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-7:activationdocument:6:2"> <!--Version 6.2 of the schema-->
  <mRID>a576a8ed-cc43-4ea9-966a-d1d8a38daded</mRID>
  <revisionNumber>1</revisionNumber>
  <type>A39</type> <!--ActivationDocument-->
  <process.processType>A47</process.processType> <!--mFRR-->
  <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!--Fingrid's ID-->
  <sender_MarketParticipant.marketRole.type>A04</sender_MarketParticipant.marketRole.type> <!--Type Resource Allocator-->
  <receiver_MarketParticipant.mRID codingScheme="A01">-------------</receiver_MarketParticipant.mRID> <!--Receiver's ID-->
  <receiver_MarketParticipant.marketRole.type>A46</receiver_MarketParticipant.marketRole.type> <!--Type BSP-->
  <createdDateTime>2025-04-08T12:22:29Z</createdDateTime> <!--Time and date in UTC+0-->
  <activation_Time_Period.timeInterval>
    <start>2025-04-08T12:30Z</start> <!--Time period of the activation-->
    <end>2025-04-08T12:45Z</end>
  </activation_Time_Period.timeInterval>
  <domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!--Finland's domain code-->
  <subject_MarketParticipant.mRID codingScheme="A01">-------------</subject_MarketParticipant.mRID> <!--Subject i.e. responsible BSP's ID-->
  <subject_MarketParticipant.marketRole.type>A46</subject_MarketParticipant.marketRole.type> <!--Type BSP-->
  <order_MarketDocument.mRID>0aa1b007fff447ebb3c5a4a9546e6706</order_MarketDocument.mRID>
  <order_MarketDocument.revisionNumber>1</order_MarketDocument.revisionNumber>
  <TimeSeries>
    <mRID>3ebc7225-ddef-4cf1-81e0-3d3e09c80657</mRID> <!--ID of the bid that was ordered for activation-->
    <resourceProvider_MarketParticipant.mRID codingScheme="A01">-------------</resourceProvider_MarketParticipant.mRID>
    <businessType>A97</businessType>
    <acquiring_Domain.mRID codingScheme="A01">10Y1001A1001A91G</acquiring_Domain.mRID> <!--Nordic Market Area's domain code-->
    <connecting_Domain.mRID codingScheme="A01">10YFI-1--------U</connecting_Domain.mRID> <!--Finland's domain code-->
    <measurement_Unit.name>MAW</measurement_Unit.name>
    <flowDirection.direction>A02</flowDirection.direction> <!--Down regulation bid-->
    <marketObjectStatus.status>A10</marketObjectStatus.status> <!--Ordered-->
    <registeredResource.mRID codingScheme="A01">RXXXXX</registeredResource.mRID> <!--Code of the reserve object (RO)-->
    <Period>
      <timeInterval>
        <start>2025-04-08T12:30Z</start> <!--Time period of the activation-->
        <end>2025-04-08T12:45Z</end>
      </timeInterval>
      <resolution>PT15M</resolution> <!--Resolution of the activation, always 15 minutes for scheduled activation (SA)-->
      <Point>
        <position>1</position>
        <quantity>1</quantity> <!--Activated quantity, may differ from the offered quantity if the bid is divisible-->
      </Point>
    </Period>
    <Reason>
      <code>B49</code> <!--Balancing-->
    </Reason>
  </TimeSeries>
</Activation_MarketDocument>
```
## Availability Document
After the 15-minute market period ends, an Availability Document is sent to the BSPs containing the bids that had been unavailable in the MTU, along with reasons why they were set as unavailable. Additionally, if a BSP causes an invalid conditional link by cancelling a linked bid, they will be immediately notified of such unavailabilities with an Availability Document.
### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the bid in UUID form |
| revisionNumber | Always 1 |
| Type | Always B45 (Availability document) |
| process.processType | Always A47 (mFRR) |
| sender_MarketParticipant.mRID  | The TSO's EIC identification | 
| sender_MarketParticipant.marketRole.type | Always A04 (TSO) | 
| receiver_MarketParticipant.mRID | Identification of the receiving party |
| receiver_MarketParticipant.marketRole.type | Always A46 (BSP) | 
| createdDateTime  | Time of document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| time_Period.timeInterval | Time period covered by the bids in the document, same format as above, start and end time | 
| **BidTimeSeries: one or more instances** |
| mRID | Unique identification of the bid in UUID form |
| bidDocument_MarketDocument.mRID | Always NA |
| bidDocument_MarketDocument.revisionNumber | Always 1 |
| requestingParty_MarketParticipant.mRID | EIC code of the party requesting bid availability update |
| requestingParty_MarketParticipant.marketRole.type | One of A46 (BSP), A49 (TSO) or A50 (Distribution System Operator) |
| businessType | One of C40 (Conditional bid), C41 (Thermal limit), C42 (Frequency limit), C43 (Voltage limit), C44 (Current limit), C45 (Short-circuit current limits), or C46 (Dynamic Stability limit) |
| domain.mRID | Unique identification of the bid in UUID form |
| **Reason: one instance per time series** |
| code | Various codes, depending on the value of _businessType_: <br> businessType = C40: B16 (Tender unavailable in MOL) <br> businessType = C41, C43, C44, C45 or C46: B18 (Failure), B46 (Internal congestion), B47 (Operational security constraints, or B60 (Unavailability of automated protection systems |
| text | Free text explaining the unavailability reason |
### Example message
This is an example of an availability document sent to the BSP. Includes a bid the TSO has marked unavailable, and a bid that's unavailable due to conditional links.
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<BidAvailability_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-n:bidavailabilitydocument:1:1"> <!--Schema version 1.1-->
  <mRID>2e37e4ad-5467-40b8-bf51-0159f23a5ea9</mRID>
  <revisionNumber>1</revisionNumber>
  <type>B45</type> <!--Availability document-->
  <process.processType>A47</process.processType> <!--mFRR-->
  <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!--Fingrid's ID-->
  <sender_MarketParticipant.marketRole.type>A04</sender_MarketParticipant.marketRole.type> <!--Type TSO-->
  <receiver_MarketParticipant.mRID codingScheme="A01">----------------</receiver_MarketParticipant.mRID> <!--BSP's ID-->
  <receiver_MarketParticipant.marketRole.type>A46</receiver_MarketParticipant.marketRole.type> <!--Type BSP-->
  <createdDateTime>2025-04-08T11:45:09Z</createdDateTime> <!--Time and date in UTC+0-->
  <time_Period.timeInterval>
    <start>2025-04-08T11:30Z</start> <!--Time period of the document, applies to the bids within-->
    <end>2025-04-08T11:45Z</end>
  </time_Period.timeInterval>
  <BidTimeSeries>
    <mRID>9661d797-f1b4-4719-bf98-7b5483831596</mRID> <!--ID of the bid that was unavailable-->
    <bidDocument_MarketDocument.mRID>NA</bidDocument_MarketDocument.mRID>
    <bidDocument_MarketDocument.revisionNumber>1</bidDocument_MarketDocument.revisionNumber>
    <requestingParty_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</requestingParty_MarketParticipant.mRID> <!--Fingrid's ID-->
    <requestingParty_MarketParticipant.marketRole.type>A49</requestingParty_MarketParticipant.marketRole.type> <!--Type TSO-->
    <businessType>C41</businessType> <!--Thermal limit-->
    <domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!--Finland's domain code-->
    <Reason>
      <code>B46</code> <!--Internal congestion-->
      <text>TSOs decision</text> <!--TSO set the bid unavailable-->
    </Reason>
  </BidTimeSeries>
  <BidTimeSeries>
    <mRID>aa3c927f-3458-4b75-b9d6-9b6f079d2ff9</mRID> <!--ID of the bid that was unavailable-->
    <bidDocument_MarketDocument.mRID>NA</bidDocument_MarketDocument.mRID>
    <bidDocument_MarketDocument.revisionNumber>1</bidDocument_MarketDocument.revisionNumber>
    <requestingParty_MarketParticipant.mRID codingScheme="A01">-----------------</requestingParty_MarketParticipant.mRID> <!--Fingrid's ID-->
    <requestingParty_MarketParticipant.marketRole.type>A46</requestingParty_MarketParticipant.marketRole.type> <!--Type TSO-->
    <businessType>C40</businessType> <!--Conditional bid-->
    <domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!--Finland's domain code-->
    <Reason>
      <code>B16</code> <!--Tender unavailable in MOL-->
      <text>Due to conditional bid</text> <!--Conditional links set the bid unavailable-->
    </Reason>
  </BidTimeSeries>
</BidAvailability_MarketDocument>
```
## Reserve Allocation Result Document
After each imbalance settlement period (ISP), BSPs receive a report of every bid activated in the period as a *ReserveAllocationResult_MarketDocument.* The document contains which bids had been activated from the BSP, their activation volumes, time periods and prices, along with information on activation reason and type.
### Table of document attributes
| Attribute | Description |
|-----------|-------------|
| mRID | Unique identification of the document in UUID form |
| revisionNumber | Always 1 |
| Type | Always A38 (Reserve allocation result document) |
| process.processType | Always A47 (mFRR) |
| sender_MarketParticipant.mRID | The TSO's EIC identification |
| sender_MarketParticipant.marketRole.type | Always A04 (TSO) | 
| receiver_MarketParticipant.mRID  | Identification of the receiving party | 
| receiver_MarketParticipant.marketRole.type | Always A46 (BSP) | 
| createdDateTime  | Time of document creation in UTC+0, format: YYYY-MM-DDTHH:MM:SSZ | 
| reserveBid_Period.timeInterval | Time period covered in the bid document, same format as above, start and end time | 
| domain.mRID | EIC identification of the control area, for Finland 10YFI-1--------U | 
| **TimeSeries: One or more instances per document** |
| mRID | Unique identification of the time series in UUID form |
| bid_Original_MarketDocument.bid_TimeSeries.mRID | UUID of the bid the time series refers to |
| bid_Original_MarketDocument.tendering_MarketParticipant.mRID | Identification of the BSP according to the original bid document |
| auction.mRID | Always MFRR_ENERGY_ACTIVATION_MARKET |
| businessType | Always A97 (mFRR) |
| acquiring_Domain.mRID | 10Y1001A1001A91G (Nordic Market Area) |
| connecting_Domain.mRID | EIC Identification of the bidding zone, for Finland 10YFI-1--------U |
| quantity_Measurement_Unit.name | Always MAW (Megawatt) |
| currency_Unit.name | Always EUR | 
| registeredResource.mRID | RO Code of the resource providing object | 
| energyPrice_Measurement_Unit.name | MWH (Megawatt hour) | 
| flowDirection.direction | One of A01 (Up) or A02 (Down) | 
| standard_MarketProduct.marketProductType | A05 if bid is available for scheduled activation only. A07 if bid is available for both scheduled and direct activation. | 
| **Series_Period: One or two per TimeSeries** |
| timeInterval  | Start and end times for the bid's activation period. Must be in UTC+0. Format: YYYY-MM-DDTHH:MMZ | 
| Resolution | Must match the activation time. Examples: PT15M for scheduled activation, PT24M for a 24 minute direct activation. | 
| **Point: Exactly one per Series_Period** |
| Position | Always 1 | 
| quantity.quantity | Activated quantity in megawatts | 
| energy_Price.amount | Energy price for the activation | 
| minimum_Quantity.quantity | Minimum offered quantity in megawatts if activated. Cannot be used for indivisible bids. If bid is divisible, the value can be 0 for fully divisible bids but must not exceed the bid's maximum quantity. | 
| **Reason: Zero, one or multiple per TimeSeries** |
| code | Populated with either reason codes for activation: B22 (System regulation) or B49 (Balancing); or activation type codes: Z58 (Scheduled activation) or Z59 (Direct activation) | 
| text | May be used for additional explanations. | 
### Example message
This is an example of a Reserve Allocation Result document sent to the BSP, containing one bid that's been subjected to scheduled activation.
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ReserveAllocationResult_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-7:reserveallocationresultdocument:6:4"> <!--Schema version 6.4-->
  <mRID>867ab704-2885-43e3-8be5-22953409007d</mRID>
  <revisionNumber>1</revisionNumber>
  <type>A38</type> <!--Reserve Allocation Result Document-->
  <process.processType>A47</process.processType> <!--mFRR-->
  <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A264</sender_MarketParticipant.mRID> <!--Fingrid's ID-->
  <sender_MarketParticipant.marketRole.type>A04</sender_MarketParticipant.marketRole.type> <!--Type TSO-->
  <receiver_MarketParticipant.mRID codingScheme="A01">----------------</receiver_MarketParticipant.mRID> <!--Receiver's ID-->
  <receiver_MarketParticipant.marketRole.type>A46</receiver_MarketParticipant.marketRole.type> <!--Type BSP-->
  <createdDateTime>2025-04-08T12:26:17Z</createdDateTime> <!--Time and date in UTC+0-->
  <reserveBid_Period.timeInterval>
    <start>2025-04-08T11:30Z</start> <!--Time period of the document, applies to the bids within-->
    <end>2025-04-08T11:45Z</end>
  </reserveBid_Period.timeInterval>
  <domain.mRID codingScheme="A01">10YFI-1--------U</domain.mRID> <!--Finland's domain code-->
  <TimeSeries>
    <mRID>f68d5e68-aaa7-4e45-91e7-1e4cb999126e</mRID>
    <bid_Original_MarketDocument.bid_BidTimeSeries.mRID>d151a1bc-0798-4172-8746-0c1fb78e1c47</bid_Original_MarketDocument.bid_BidTimeSeries.mRID> <!--ID of the bid that was activated-->
    <bid_Original_MarketDocument.tendering_MarketParticipant.mRID codingScheme="A01">44X-000000000172</bid_Original_MarketDocument.tendering_MarketParticipant.mRID>
    <auction.mRID>MFRR_ENERGY_ACTIVATION_MARKET</auction.mRID>
    <businessType>A97</businessType>
    <acquiring_Domain.mRID codingScheme="A01">10Y1001A1001A91G</acquiring_Domain.mRID> <!--Nordic Market Area's domain code-->
    <connecting_Domain.mRID codingScheme="A01">10YFI-1--------U</connecting_Domain.mRID> <!--Finland's domain code-->
    <quantity_Measurement_Unit.name>MAW</quantity_Measurement_Unit.name>
    <currency_Unit.name>EUR</currency_Unit.name>
    <energy_Measurement_Unit.name>MWH</energy_Measurement_Unit.name>
    <flowDirection.direction>A02</flowDirection.direction> <!--Down regulation bid-->
    <Period>
      <timeInterval>
        <start>2025-04-08T11:30Z</start> <!--Time period of the activation-->
        <end>2025-04-08T11:45Z</end>
      </timeInterval>
      <resolution>PT15M</resolution> <!--Resolution of the activation, always 15 minutes for scheduled activation (SA)-->
      <Point>
        <position>1</position>
        <quantity>5</quantity>
        <energy_Price.amount>-4.5</energy_Price.amount>
      </Point>
    </Period>
    <Reason>
      <code>B49</code> <!--Balancing-->
    </Reason>
    <Reason>
      <code>Z58</code> <!--Scheduled activation (SA)-->
    </Reason>
  </TimeSeries>
</ReserveAllocationResult_MarketDocument>
```
## Acknowledgement Document
For every message detailed in this page, an acknowledgement document should be generated and sent back by the receiving party to indicate that the message has been successfully received. The document can be either positive (code A01) or negative (A02).
> [!NOTE]
> 
> Activation acknowledgement and response documents are different messages that must be sent separately.
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
<Acknowledgement_MarketDocument xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:iec62325.351:tc57wg16:451-1:acknowledgementdocument:8:1" ArchiveFilePath="D:\VAKSI\Sanomat\EntsoeSanomia\Archive\Cim15mFRRBidAckOut\AcknowledgementDocument_44X-00000000010G_638792937139662546.xml"> <!--Schema version 8.1-->
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

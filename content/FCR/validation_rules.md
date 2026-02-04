# Bid Validation Rules

### Document level rules
* Bid must be submitted and received by the TSO between gate opening and closure times for every bid in the document. After the gate closure time, it is no longer possible to submit or remove bids. It is not allowed to include bids for any time period where the gate is closed, even if they are unchanged from previously submitted bids.
* Gate opening time for BSPs is D-30.
* Gate closure time for BSPs is D-1 at 18:30 EET/EEST.
* Technical validation of the bid document: Must be the correct xml schema with all mandatory attributes included. Correct version of the document is expected.
* Recommended maximum number of bids within a bid document is 2 000.
* Bid documents, Allocation Result documents and Acknowledgement documents will be exchanged between the parties using the ECP/EDX network. If the EDX connection is not working properly, the BSP should, if possible, use the Vaksi Web UI as a back-up to check the status of the submitted bids. 

### Bid level rules
* Bid volume can contain a maximum of 1 decimal
* Bid price can contain a maximum of 2 decimals
* Decimal separator must be a period
* Bid time period must be within document time period
* All bids must be fully divisible
* Each Bid Time Series can include only one bid and period (1 hour)

| Attribute | FCR-N | FCR-D |
|-----------|-------|-------|
|Minimum bid size (MW)|0,1|1|
|Maximum bid size (MW)|5|10|
|Granularity (after minimum size)|0,1|0,1|
|Minimum bid price (€/MW)|0|0|
|Maximum bid price (€/MW)|-|-|

### Voluntary bid identification
In order to more easily recognize bids, BSPs may add a voluntary bid identification text in their bid time series using the Reason attribute. The secondary bid ID can be in plain language and not any specific format. The voluntary bid ID is also added to bid-level reserve allocation result documents if it exists.
* Secondary bid ID can be a maximum of 100 characters
* Allowed characters: Alphanumeric characters, /()+,-_
* Reason code must be A95 (Complementary Information)

### Rules for cancelling bids
* To cancel time series previously sent a new document is sent with the following information:
    * A new unique document mRID (document identification)
    * Revision number is always equal to '1'
    * A newer created date-time than the previously sent document
    
For **ReserveBid_MarketDocument** updates are done by sending the affected time series with new data. Cancellation
of time series is done by sending value 0 for quantity. The ensure update of the correct time series the bid
identification of the original time series must be used. A BSP can see their valid bids in the Vaksi Web trading system. The bids can also be updated and deleted
manually in the Vaksi Web UI.

### Rules for bid updates
* Cannot change the bid's time period
* Cannot change the bid's resource object (RO)
If you wish to change either of these bid attributes, you must first cancel the bid (leave a new document with the bid's volume set to 0) and submit a new bid with the attributes changed. Additionally, the new bid document must have a unique UUID identifier, while the revision number stays as 1.
### Portfolio limits
BSPs have a set portfolio limit depending on their capacity. The TSO can change this portfolio limit when the BSP's total FCR capacity changes.
* Bids must not exceed the portfolio limit for each MTU.
* Document containing any bids that exceed the limit will be rejected.
* FCR-N, FCR-D Up, and FCR-D Down markets all have their own portfolio limit values.
### Acknowledgement rules
* For each bid message received, an acknowledgement document is sent back to the BSP
* Messages are never partially accepted, only fully accepted or fully rejected
* The acknowledgement message contains the erroneuous timeseries and a reason text indicating the error
* Document level error code is A01 for accepted message, A02 for fully rejected message.

The table below contains a list of error texts included in the acknowledgement document in case the validation of a bid document fails:
| Description | Level of validation| Error text |
|-----------|-------|-------|
|**Reserve Bid Document**|||
|Document Identification is mandatory|Message|Message reference missing.|
|Document Identification must be unique|Message|Message reference must be unique.|
|Message must be received within a given time|Message|Message was received after deadline.|
|Message can only include bids for next 30 days|Message|Message contains data for more than next 30 days.|
|Sender Identification must be connected to the Subject Party|Message|Sender is not connected to the Subject Party. |
|**Bid Time Series**|||
|Message can only contain FCR bids|Message|Message can only contain FCR bids.|
|Measure Unit Quantity required |Bid|Quantity unit required.|
|Quantity unit must be MAW|Bid|Quantity unit must be MAW.|
|Measure Unit Price required|Bid|Currency required.|
|Currency must be EUR|Bid|Currency must be EUR.|
|Reserve object code required|Bid|Reserve object code required.|
|**Bid Time Series Interval**|||
|Position is required to be 1|Bid|The time interval of the bid can be only one hour|
|Quantity can contain only one decimal|Bid|Quantity contains too many decimals; position <pos1>|
|Quantity is required|Bid|Quantity required; position <pos>|
|Quantity must be 0 or larger|Bid|Quantities must be 0 or larger; position <pos>|
|Quantity must be maximum 5 MW for FCR-N and 10 MW for FCR-D|Bid|Maximum quantity 5 MW for FCR-N and 10 MW for FCR-D.|
|Price is required|Bid|Price required; position <pos>|
|Bid price must be 0 or larger|Bid|Price is lower than the lower limit; position <pos>.|
|Reserve object is invalid|Bid|Reserve object must valid and connected to the subject party.|
|Linked bid identification is invalid|Bid|Linked bid identification must be 1-10. Only FCR-N bids can have linked bid identification.|

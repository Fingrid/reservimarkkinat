# Bid Validation Rules

### Document level rules
* Bid must be submitted and received by the TSO between gate opening and closure times for every bid in the document. After the gate closure time, it is no longer possible to submit or remove bids. It is not allowed to include bids for any time period where the gate is closed, even if they are unchanged from previously submitted bids.
* Gate opening time for BSPs is D-30.
* Gate closure time for BSPs is D-1 at 18:00 EET/EEST.
* Technical validation of the bid document: Must be the correct xml schema with all mandatory attributes included. Correct version of the document is expected.
* Recommended maximum number of bids within a bid document is 2000.
* Bid documents, Allocation Result documents and Acknowledgement documents will be exchanged between the parties using the ECP/EDX network. If the EDX connection is not working properly, the BSP should, if possible, use the Vaksi Web UI as a back-up to check the status of the submitted bids. 

### Bid level rules
* Bid volume can contain a maximum of 1 decimal
* Bid price can contain a maximum of 2 decimals
* Decimal separator must be a period
* Bid time period must be within document time period
* All bids must be indivisible. FFR bids are always accepted fully.
* Each Bid Time Series can include only one bid and period (1 hour)

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

### Rules for combination bids
BSPs may send bids as combination bids for both the FFR and FCR-N or FCR-D Up markets. Combination bids are created by exclusively linking exactly one FFR bid with exactly one FCR bid. The FFR part of a combination bid is processed first; if the FFR part of the combination bid is not used, the bid is sent to the corresponding FCR market.
* Both parts of a combination bid must be included in the same bid document
* Linked bids must have the same volume and time interval
* Linked bids can have different prices, as long as they are 0 or higher
* Submitting party must have a valid contract with Fingrid for both FFR and FCR markets
* Exclusive Bid Identifier must be unique for each combination bid

### Acknowledgement rules
* For each bid message received, an acknowledgement document is sent back to the BSP
* Messages are never partially accepted, only fully accepted or fully rejected
* The acknowledgement message contains the erroneuous timeseries and a reason text indicating the error
* Document level error code is A01 for accepted message, A02 for fully rejected message.

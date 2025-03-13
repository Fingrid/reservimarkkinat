# Bid Validation Rules
### Document level rules
* Bid must be submitted and received by the TSO between gate opening and closure times for every bid in the document. After the gate closure time, it is no longer possible to submit or remove bids. It is not allowed to include bids for any time period where the gate is closed, even if they are unchanged from previously submitted bids.
* Gate opening time for BSPs is D-7.
* Gate closure time for BSPs is QH-25 min.
* Technical validation of the bid document: Must be the correct xml schema with all mandatory attributes included. Correct version of the document is expected. 

### Bid level rules
* Bid volume must be a whole number and between 1 and 999 MW
* Bid price must be between -15000/15000 EUR and have the correct resolution of 0.01 EUR
* Bid time period must be within document time period
* All bids must be fully divisible
* Sum of the bids cannot exceed the BSP's portfolio limit

### Rules for cancelling bids
* To cancel time series previously sent a new document is sent with the following information:
    * A new unique document mRID (document identification)
    * Revision number is always equal to '1'
    * A newer created date-time than the previously sent document
    
For **ReserveBid_MarketDocument** updates are done by sending the affected time series with new data. Cancellation
of time series is done by sending value 0 for quantity. The ensure update of the correct time series the bid
identification of the original time series must be used. 

### Rules for bid updates
* Cannot change the bid's time period
* Cannot change the bid's resource object (RO)
If you wish to change either of these bid attributes, you must first cancel the bid (leave a new document with the bid's volume set to 0) and submit a new bid with the attributes changed. Additionally, the new bid document must have a unique UUID identifier, while the revision number stays as 1.

### Acknowledgement rules
* For each bid message received, an acknowledgement document is sent back to the BSP
* Messages are never partially accepted, only fully accepted or fully rejected
* The acknowledgement message contains the erroneuous timeseries and a reason text indicating the error
* Document level error code is A01 for accepted message, A02 for fully rejected message.

List of error texts can be found on the Document structure page. 




# Bid Validation Rules
## Document level rules
* Document must be submitted between gate opening and closure times for every bid in the document. After the gate closure time, it is no longer possible to submit or remove bids. It is not allowed to include bids for any time period where the gate is closed, even if they are unchanged from previously submitted bids.
    * Gate opening time for BSPs is D-30.
    * Gate closure time for BSPs is QH-45 min.
* Technical validation of the bid document: Must be the correct xml schema with all mandatory attributes included. Correct version of the document is expected. See the Document Structure page for more details.
## Bid level rules
mFRR energy bids can be categorised into simple or complex (exclusive, inclusive, multipart) bids. Validation rules that apply for simple bids are used as a baseline and apply for complex bids unless an exception is stated. Additionally, mFRR energy bids can have links between them, and linked bids can affect each other's availability in different quarter-hours.
### Simple bids
* Bid volume must be a whole number and between 1 and 9999 MW. BSPs may have different upper limits.
    * Aggregated/Inclusive bids can have up to two decimals in their volume, but the sum of the bids must be a whole number.
* Bid price must be between -10000/10000 EUR and have the correct resolution of 0.01 EUR
* Bid time period must be within document time period
* If bid is fully or partially divisible, bid must have a minimum activation volume. Minimum volume is 0 MW for fully divisible bids, 1 MW or more for partially divisible.
### Exclusive bids
Exclusive bids are a group of bids, that when one is activated, the others are set as unavailable and thus unable to be activated.
* Bids must have the same market product type and bidding zone
* Bids must be on the same market period (quarter hour)
* Bids cannot also be multipart or inclusive bids
* Bids cannot contain conditional links. Technical links are allowed, as long as every bid in the group has the same technical link ID.
### Multipart bids
Multipart bids are a group of bids with differing prices that must be activated in price order: The higher priced bid in the multipart group can only be activated when the lower priced bid is activated in upward regulation; the price order is reversed in downward regulation.
* Bids must have the same market product type and bidding zone
* Bids must have the same direction
* Bids must be on the same market period (quarter hour)
* Bids must have a different price
* Bids cannot also be exclusive or inclusive bids
* Bids cannot contain conditional links. Technical links are allowed, as long as every bid in the group has the same technical link ID.
### Aggregated/Inclusive bids
Aggregated or inclusive bids are a group of which that must all be activated when one is activated.
* Bids must have the same market product type and bidding zone
* Bids must have the same direction
* Bids must have the same price
* Bids must be on the same market period (quarter hour)
* Bids cannot also be multipart or exclusive bids
* The sum of the group's bid volumes must be a whole number. The individual bids can have decimals as long as the sum condition is met.
* Technical links are allowed, as long as every bid in the group has the same technical link ID.
* Conditional links are allowed, as long as every bid in the group has the same conditional links in the same order.
### Bid linking: Technical linking
Technical links link bids between consecutive quarter-hours: When a technically linked bid is directly activated, the linked bid in the next quarter-hour will become unavailable.
* Technical links are allowed on both simple and complex bids.
* Technical links must be unique within the quarter-hour: One bid or complex bid group can use the same technical link ID within the same quarter-hour.
### Bid linking: Conditional linking
Conditional links allow for more complex interactions between bids compared to technical linking. Depending on the exact condition, conditional bids may start as available or unavailable and change into the other state when the condition is met. For more details on conditional link conditions, see the Document Structure page.
* Conditional links are only allowed for simple bids and aggregated/inclusive bids
* A bid can only have conditional links to three bids in the previous quarter-hour (QH-1) and to three bids in the quarter-hour before the previous (QH-2), for a total of six conditional links.
* Only one conditional link is allowed between any two bids.
* Each link must have a condition. See Document Structure for details on different conditions.
* Cannot mix conditionally unavailable and conditionally available link conditions on the same bid. See Document Structure for details on different conditions, and which links fall under which state.
* If a bid within a conditionally linked chain is cancelled, the entire chain after it will become invalid and unable to be activated. BSPs are notified with an Availability Document when they cause an invalid link.
### Voluntary bid identification
In order to more easily recognize bids, BSPs may add a voluntary bid identification text in their bid time series using the Reason attribute. The secondary bid ID can be in plain language and not any specific format. The voluntary bid ID is also added into activation, unavailability, and reserve allocation result documents if it exists.
* Secondary bid ID can be a maximum of 100 characters
* Allowed characters: Alphanumeric characters, /()+,-_
* Reason code must be A95 (Complementary Information)
## Rules for bid updates
To update a bid, the BSP can send the bid again with the same mRID and updated attributes. Additionally, the new bid document must have a unique mRID with a fixed revision number of 1, as well as a newer created timestamp than the previous document. Existing bids can be cancelled by setting their volume to 0 in the message.
* Cannot change market product type. If you want to change it, the bid must first be cancelled and then sent again with the correct market product type.
* Bids cannot be changed from simple to complex.
* A complex bid group cannot be partially canceled. The entire group must be cancelled at once. Alternatively, a bid in a complex group can be changed into a simple bid, then cancelled.
* Cannot change the bid's time period.
* Cannot change the bid's resource object (RO). 
## Acknowledgement rules
* For each bid message received, an acknowledgement document is sent back to the BSP
* Messages are never partially accepted, only fully accepted or fully rejected; if a bid document contains one erroneous bid time series, none of the bids will be accepted even if the rest don't contain errors.
* The acknowledgement message contains the erroneuous timeseries and a reason text indicating the error. List of error texts can be found on the Document structure page.
* Document level error code is A01 for accepted message, A02 for fully rejected message. 

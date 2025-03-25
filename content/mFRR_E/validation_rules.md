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
* Bids cannot contain conditional links. Technical links are allowed, as long as every bid in the group has the same technical link ID.
### Bid linking: Technical linking
Technical links link bids between consecutive quarter-hours: When a technically linked bid is directly activated, the linked bid in the next quarter-hour will become unavailable.
* Technical links are allowed on both simple and complex bids.
* Technical links must be unique within the quarter-hour: One bid or complex bid group can use the same technical link ID within the same quarter-hour.
### Bid linking: Conditional linking
Conditional links allow for more complex interactions between bids compared to technical linking. Depending on the exact condition, conditional bids may start as available or unavailable and change into the other state when the condition is met. For more details on conditional links, see the Document Structure page.
* Conditional links are only allowed for simple bids
* A bid can only have conditional links to three bids in the previous quarter-hour (QH-1) and to three bids in the quarter-hour before the previous (QH-2), for a total of six conditional links.
* Only one conditional link is allowed between any two bids.
* Each link must have a condition.
* If a bid within a conditionally linked chain is cancelled, the entire chain after it will become invalid and unable to be activated. BSPs are notified with an Availability Document when they cause an invalid link.
## Acknowledgement rules

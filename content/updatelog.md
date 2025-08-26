# Change Log
This page contains a changelog for VAKSI updates with changes or additions to the reserve markets that affect BSPs.
## August 2025
* **mFRR bid messages: Conditional links for aggregated/inclusive bids are now allowed.**
  *  Bids in an inclusive group, i.e. with the same inclusiveBidsIdentification, must have identical links and in the same order.
  *  Can link ordinary bids to aggregated bids and vice versa.
  *  All other conditional link rules apply as normal.
* **FCR & FFR: registeredResource.mRID will be ignored if included in bid messages. Removed the corresponding text boxes from bid input and reporting displays.**
  * This information was not mandatory previously, and now it will not be used or saved anywhere.

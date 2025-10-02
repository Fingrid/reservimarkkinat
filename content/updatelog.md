# Change Log
This page contains a changelog for VAKSI updates with changes or additions to the reserve markets that affect BSPs.
## September 2025
* **FFR: Updated Bid Document schema to version 7.4.**
  * Added marketAgreement.type attribute to bid time series, same as in FCR bid time series.
  * Changed quantity_Measure_Unit.name to quantity_Measurement_Unit.name
  * Changed price_Measure_Unit.name to price_Measurement_Unit.name
  * Documents using the old 7.1 schema will be converted to the new schema and will still work.
* **mFRR, FCR & FFR: added voluntary bid identification**
  * In these markets, BSPs can now add a secondary identification to bids in text form for easier recognition.
  * Add a Reason to bid time series with the code A39 to add a secondary identification. More information in the respective markets' Document Structure pages.
  * If submitted bids contain a secondary identification, it will also be added to activation, unavailability and reserve allocation result documents.
## August 2025
* **mFRR bid messages: Conditional links for aggregated/inclusive bids are now allowed.**
  *  Bids in an inclusive group, i.e. with the same inclusiveBidsIdentification, must have identical links and in the same order.
  *  Can link ordinary bids to aggregated bids and vice versa.
  *  All other conditional link rules apply as normal.
* **FCR & FFR: registeredResource.mRID will be ignored if included in bid messages. Removed the corresponding text boxes from bid input and reporting displays.**
  * This information was not mandatory previously, and now it will not be used or saved anywhere.

# Bid Validation Rules
### Document level rules
* Bid must be submitted and received by the TSO between gate opening and closure times for every bid in the document
* Technical validation of the bid document: Must be the correct xml schema with all correct attributes *(need to clarify)*

### Bid level rules
* Bid volume must be a whole number and between 1 and 999 MW
* Bid price must be between -15000/15000 EUR and have the correct resolution of 0.01 EUR
* Bid time period must be within document time period
* Sum of the bids cannot exceed the BSP's portfolio limit

### Rules for bid updates
* Cannot change the bid's time period
* Cannot change the bid's resource object (RO)
If you wish to change either of these bid attributes, you must first cancel the bid (leave a new document with the bid's volume set to 0) and submit a new bid with  the attributes changed.

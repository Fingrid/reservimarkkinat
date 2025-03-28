# Document structure

In this page you can find information about the structure and attributes of various documents related to the market. For the mFRR capacity market, the most important message types are the bid document, allocation result, balancing as well as the acknowledgement document.

## General document rules

* Dates and times should be in UTC, with the format YYYY-MM-DDThh:mm:ssZ. The last ‘Z’ stands for Zero and indicates UTC+0. The time period the document covers, however, should be in the same day in CET/CEST. This means the day is from 23:00 to 23:00 during winter time, and 22:00 to 22:00 during summer time.
* The beginning and ending date and time of the period covered by the document shall cover just one CET/CEST day
* When changing from winter time to summer time, the document covers 23 hours (from 23:00 to 22:00). When changing from summer time to winter time, the document covers 25 hours (from 22:00 to 23:00).
* Each document must have an unique identifier. Furthermore, the document identification itself should not have any significant meaning. The document revision number is always 1.

from couchbase import Couchbase
cb = Couchbase.connect(bucket='beer-sample')

hasRow = True
rowPerPage = 5
page = 0
currentStartkey=""
startDocId=""

while hasRow :
	hasRow = False
	skip = 0 if page == 0 else 1
	page = page + 1
	print "-- Page %s --" % (page)
	rows = cb.query("test", "by_country", limit=rowPerPage, skip=skip, startkey=currentStartkey, startkey_docid=startDocId)
	for row in rows:
		hasRow = True
		print "Country: \"%s\" \t Id: '%s'" % (row.key, row.docid)
		currentStartkey = row.key
		startDocId = row.docid
	print " -- -- -- -- \n"
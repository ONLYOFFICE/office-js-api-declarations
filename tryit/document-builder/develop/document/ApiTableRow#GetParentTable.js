builder.CreateFile("docx");
var oDocument = Api.GetDocument();
var oTableStyle = oDocument.CreateStyle("CustomTableStyle", "table");
oTableStyle.SetBasedOn(oDocument.GetStyle("Bordered"));
var oTable = Api.CreateTable(3, 3);
oTable.SetStyle(oTableStyle);
oTable.SetWidth("percent", 100);
var oRow = oTable.GetRow(0);
var oParentTable = oRow.GetParentTable();
oParentTable.SetTableBorderBottom("single", 32, 0, 51, 51, 51);
oDocument.Push(oParentTable);
builder.SaveFile("docx", "GetParentTable.docx");
builder.CloseFile();

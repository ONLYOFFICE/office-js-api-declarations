builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet();

var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.TIMEVALUE("11/5/18 11:17:00 am"); 

oWorksheet.GetRange("C1").SetValue(ans);

builder.SaveFile("xlsx", "TIMEVALUE.xlsx");
builder.CloseFile();
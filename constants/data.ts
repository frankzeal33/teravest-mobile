const gender = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' }
];

const IDType = [
  { label: 'National ID', value: 'National_ID' },
  { label: 'Drivers Lincense', value: 'Drivers_Lincense' },
  { label: 'International Passport', value: 'International_Passport' },
]

const investmentType = [
  {title: 'Basic'},
  {title: 'Mega'},
  {title: 'Premium'}
];

const cycleType = [
  { title: 'Weekly' },
  { title: '2 Weeks' },    
  { title: 'Monthly' },
  { title: '3 Months' },     
  { title: '6 Months' },   
  { title: '1 Year' },        
  { title: '2 Years' },       
  { title: '3 Years' },     
  { title: 'Lifetime' }
];

const returnDecision = [
  { label: 'Invest ROI plus plan', value: 'Invest ROI plus plan' },
  { label: 'Invest only plan', value: 'Invest only plan' },
  { label: 'Decide later', value: 'Decide later' }
];

export default { gender, IDType, returnDecision, investmentType, cycleType }
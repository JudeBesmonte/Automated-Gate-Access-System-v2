import { PlanType, type Prisma } from "@prisma/client"

export const plans: Prisma.PlanCreateInput[] = [
	{
		planType: PlanType.GOVERNMENT,
		name: "Premium Plan",
		slug: "premium-plan",
		monthlyPrice: 14000,
		installationFee: 30000,
		hasKiosk: false,
		isActive: true,
		features: [
			"99% Uptime that supports up to 200 Concurrent Device",
			"24/7 cloud-based monitoring",
			"Blocking of website or unwanted devices upon request",
			"QBYFI WiFi System powered by Starlin"
		],
		inclusions: [],
		addons: [],
		equipment: [
			"Starlink Gen 4 Dish and Gen Router",
			"RG-ES105GD Unmanaged Switch",
			"Ruijie RG-EG209GS (Gateway)",
			"Ruijie RAP 2260(G) 3x",
			"PoE Injector (E-130(GE)",
			"Cat 6 cable"
		]
	},
	{
		planType: PlanType.GOVERNMENT,
		name: "Standard Plan",
		slug: "standard-plan",
		monthlyPrice: 9999,
		installationFee: 20000,
		hasKiosk: false,
		isActive: true,
		features: [
			"99% Uptime that supports up to 100 Concurrent Device",
			"24/7 cloud-based monitoring",
			"QBYFI WiFi System powered by Starlink"
		],
		inclusions: [],
		addons: [],
		equipment: [
			"Starlink Gen 4 Dish and Gen Router",
			"RG-ES105GD Unmanaged Switch",
			"Ruijie RG-EG209GS (Gateway)",
			"Ruijie RAP 2260(G) 2x",
			"PoE Injector (E-130(GE)",
			"Cat 6 cable"
		]
	},
	{
		planType: PlanType.GOVERNMENT,
		name: "Government / Enterprise Plan",
		slug: "government-enterprise-plan",
		monthlyPrice: 5999,
		installationFee: 12000,
		hasKiosk: false,
		isActive: true,
		features: [
			"99% Uptime that supports 20 users/devices that supports up to 50 Concurrent Device",
			"24/7 cloud-based monitoring",
			"QBYFI WiFi system powered by Starlink"
		],
		inclusions: [],
		addons: [],
		equipment: [
			"Starlink Gen 4 Dish and Gen Router",
			"RG-ES105GD Unmanaged Switch",
			"Ruijie RG-EG209GS (Gateway)",
			"Ruijie RAP 2260(G)",
			"PoE Injector (E-130(GE)",
			"Cat 6 cable"
		]
	},
	{
		planType: PlanType.EDUCATION,
		name: "Campus / University Plan",
		slug: "campus-university-plan",
		monthlyPrice: 4699,
		installationFee: 8000,
		hasKiosk: true,
		isActive: true,
		features: [
			"99% Uptime that supports 20 users/devices",
			"Priority Technical Support (24/7 monitoring through Cloud)",
			"Monthly Usage and Maintenance Report",
			"Priority Usage and Blocking of Unauthorized Devices/Sites"
		],
		inclusions: ["Free Trial for a Customized Website for 30 Days"],
		addons: [
			"Learning Management System with AI for one Teacher with 40 students for two months",
			"Digital Speech Lab with AI for one Teacher with 40 students Free Queuing System for two months",
			"Document Tracking System for two months"
		],
		equipment: []
	}
]

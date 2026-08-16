// -- Access Token --

export type AccessTokenRequest = {
	code: number
	msg: string
	accessToken: string
	refreshToken: string
}

// -- Projects --

export type SubGroup = {
	name: string // Project Name
	description: string
	timezone: string
	groupId: number // Project Id
	createTime: Date
	type: string
	businessType: string
	subGroups: SubGroup[] // Project List
	sceneEnum: string
	longitude?: number
	latitude?: number
}

export type Groups = {
	name: string
	timezone: string
	groupId: number
	subGroups: SubGroup[]
}

export type GetProjectRequest = {
	code: number
	msg: string
	groups: Groups[]
	rootGroupName: string
	rootGroupId: number
}

// -- Voucher Groups --

export type VoucherGroup = {
	id: number
	userGroupName: string // Promo Group Name
	authProfileId: string
	createTime: number
	updateTime: number
	name: string // Promo Name
	noOfDevice: number
	bindMac: number
	timePeriod: number // Usage time of vouchers in minutes
	quota: number
	downloadRateLimit: number
	uploadRateLimit: number
	price?: number // Price per voucher
	packageType: string
	isBindSsid: number
	bindSsid: string
	kickOffType: number
}

export type GetVoucherGroupRequest = {
	code: number
	msg: string
	data: VoucherGroup[]
	count: number
	maxAllowNum: number
}

// -- Vouchers --

export const VoucherStatus = {
	UNUSED: "1",
	IN_USE: "2",
	EXPIRED: "3"
} as const

export type VoucherStatus = (typeof VoucherStatus)[keyof typeof VoucherStatus]

export type List = {
	uuid: string
	tenantId: string
	voucherCode: string // Voucher Code
	nameRef: string
	timePeriod: number // Time Left in minutes
	usedTime: number // Time Used in minutes
	createTime: number // Creation Time
	maxClients: number
	currentClients: number
	quota: number // Max Voucher Usage (depletes with used quota)
	usedQuota: number // Voucher Usage
	status: VoucherStatus // 1: Unused, 2: In Use, 3: Expired
	qrcodeUrl: string
	downloadRateLimit: number
	uploadRateLimit: number
	packagePrice?: number
	bindMac: number
	packageName: string // Promo Name
	userGroupId: string // Promo Group ID
	userGroupName?: string // Promo Group Name
	disableStatus: number
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
	comment?: string
	loginTime?: number // Voucher Usage Start Time
	expiryTime?: number // Voucher Usage End Time (shows if not unlimited usage)
}

type VoucherData = {
	code: number
	msg: string
	count: number
	list: List[]
}

export type GetVoucherRequest = {
	code: number
	msg: string
	voucherData: VoucherData
}

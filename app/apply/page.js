"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApplyPage;
// DEV MODE: Set to true to pre-fill all required fields for quick testing
var DEV_MODE = true;
var react_1 = require("react");
var link_1 = require("next/link");
var image_1 = require("next/image");
var navigation_1 = require("next/navigation");
var uuid_1 = require("uuid");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var radio_group_1 = require("@/components/ui/radio-group");
var select_1 = require("@/components/ui/select");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var conversion_tracking_1 = require("@/components/conversion-tracking");
var signature_modal_1 = require("@/components/signature-modal");
var submit_application_1 = require("@/lib/actions/submit-application");
var download_application_pdf_1 = require("@/lib/actions/download-application-pdf");
var upload_application_documents_1 = require("@/lib/actions/upload-application-documents");
var DRAFT_STORAGE_KEY = "turbo_funding_application_draft";
var DRAFT_STEP_KEY = "turbo_funding_application_step";
var PRIMARY_SIGNATURE_KEY = "turbo_funding_primary_signature";
var SECONDARY_SIGNATURE_KEY = "turbo_funding_secondary_signature";
var APPLICATION_COMPLETED_KEY = "turbo_funding_completed_applications";
var US_STATES = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
];
// Funding range limits (in dollars)
var MIN_FUNDING_AMOUNT = 1000;
var devFormData = {
    // Step 1: Starting Information
    startingBusinessName: "Test Business LLC",
    startingOwnerName: "John Doe",
    startingPhone: "(555) 987-6543",
    startingEmail: "eddielacrosse2@gmail.com",
    // Step 2: Funding Information
    amountRequested: "50000",
    useOfFunds: "expansion",
    fundingAmount: "$50,000",
    fundingPurpose: "Business Expansion",
    // Step 3: Business Information
    businessName: "Test Business LLC",
    legalBusinessName: "Test Business LLC",
    dba: "Test DBA",
    dbaName: "Test DBA",
    federalTaxId: "12-3456789",
    entityType: "LLC",
    businessType: "LLC",
    businessStartDate: "2020-01-15",
    yearsInBusiness: "5",
    annualRevenue: "250001-500000",
    stateIncorporated: "California",
    industry: "Retail",
    businessAddress: "123 Business St",
    businessCity: "Los Angeles",
    businessState: "California",
    businessZip: "90001",
    businessZipCode: "90001",
    businessPhone: "(555) 123-4567",
    businessEmail: "contact@testbusiness.com",
    email: "john@testbusiness.com",
    // Step 3: Owner Information
    firstName: "John",
    lastName: "Doe",
    phone: "(555) 987-6543",
    dateOfBirth: "1985-06-15",
    ssn: "123-45-6789",
    homeAddress: "456 Home Ave",
    city: "Los Angeles",
    state: "California",
    zip: "90002",
    zipCode: "90002",
    creditScore: "good",
    ownershipPercentage: "100",
    percentageOwnership: "100",
    // Step 4: Signature
    signature: "John Doe",
    signatureDate: new Date().toISOString().split("T")[0],
    additionalInfo: "",
    // Second Owner (Dev Mode placeholder)
    secondOwnerFirstName: "Jane",
    secondOwnerLastName: "Smith",
    secondOwnerPhone: "(555) 222-3333",
    secondOwnerDateOfBirth: "1988-03-22",
    secondOwnerSsn: "987-65-4321",
    secondOwnerHomeAddress: "789 Partner Ave",
    secondOwnerCity: "Los Angeles",
    secondOwnerState: "California",
    secondOwnerZipCode: "90003",
    secondOwnerCreditScore: "excellent",
    secondOwnerPercentageOwnership: "50",
};
var getInitialFormData = function () { return ({
    // Starting Information (Step 1)
    startingBusinessName: DEV_MODE ? devFormData.startingBusinessName : "",
    startingOwnerName: DEV_MODE ? devFormData.startingOwnerName : "",
    startingPhone: DEV_MODE ? devFormData.startingPhone : "",
    startingEmail: DEV_MODE ? devFormData.startingEmail : "",
    // Business Information
    legalBusinessName: DEV_MODE ? devFormData.legalBusinessName : "",
    dbaName: DEV_MODE ? devFormData.dbaName : "",
    federalTaxId: DEV_MODE ? devFormData.federalTaxId : "",
    businessType: DEV_MODE ? devFormData.businessType : "",
    yearsInBusiness: DEV_MODE ? devFormData.yearsInBusiness : "",
    annualRevenue: DEV_MODE ? devFormData.annualRevenue : "",
    stateIncorporated: DEV_MODE ? devFormData.stateIncorporated : "",
    industry: DEV_MODE ? devFormData.industry : "",
    businessAddress: DEV_MODE ? devFormData.businessAddress : "",
    businessCity: DEV_MODE ? devFormData.businessCity : "",
    businessState: DEV_MODE ? devFormData.businessState : "",
    businessZipCode: DEV_MODE ? devFormData.businessZipCode : "",
    // Personal Owner Information
    firstName: DEV_MODE ? devFormData.firstName : "",
    lastName: DEV_MODE ? devFormData.lastName : "",
    phone: DEV_MODE ? devFormData.phone : "",
    dateOfBirth: DEV_MODE ? devFormData.dateOfBirth : "",
    ssn: DEV_MODE ? devFormData.ssn : "",
    homeAddress: DEV_MODE ? devFormData.homeAddress : "",
    city: DEV_MODE ? devFormData.city : "",
    state: DEV_MODE ? devFormData.state : "",
    zipCode: DEV_MODE ? devFormData.zipCode : "",
    creditScore: DEV_MODE ? devFormData.creditScore : "",
    percentageOwnership: DEV_MODE ? devFormData.percentageOwnership : "",
    secondOwnerFirstName: "",
    secondOwnerLastName: "",
    secondOwnerPhone: "",
    secondOwnerDateOfBirth: "",
    secondOwnerSsn: "",
    secondOwnerHomeAddress: "",
    secondOwnerCity: "",
    secondOwnerState: "",
    secondOwnerZipCode: "",
    secondOwnerCreditScore: "",
    secondOwnerPercentageOwnership: "",
    fundingAmount: DEV_MODE ? devFormData.fundingAmount : "",
    fundingPurpose: DEV_MODE ? devFormData.fundingPurpose : "",
    additionalInfo: DEV_MODE ? devFormData.additionalInfo : "",
    signature: DEV_MODE ? devFormData.signature : "",
    signatureImage: "", // Canvas signature data URL
    secondOwnerSignature: "",
    signatureDate: DEV_MODE ? devFormData.signatureDate : "",
    agreeToTerms: false,
    secondOwnerAgreeToTerms: false,
    bankStatements: null,
    otherDocuments: null,
    // Updates from new code
    amountRequested: DEV_MODE ? devFormData.amountRequested : "",
    useOfFunds: DEV_MODE ? devFormData.useOfFunds : "",
    businessName: DEV_MODE ? devFormData.businessName : "",
    dba: DEV_MODE ? devFormData.dba : "",
    businessPhone: DEV_MODE ? devFormData.businessPhone : "",
    businessEmail: DEV_MODE ? devFormData.businessEmail : "",
    businessStartDate: DEV_MODE ? devFormData.businessStartDate : "",
    entityType: DEV_MODE ? devFormData.entityType : "",
    businessZip: DEV_MODE ? devFormData.businessZip : "",
    email: DEV_MODE ? devFormData.email : "",
    zip: DEV_MODE ? devFormData.zip : "",
    ownershipPercentage: DEV_MODE ? devFormData.ownershipPercentage : "",
}); };
// File validation constants
var MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
var ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];
var SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
function ApplyPage() {
    var _this = this;
    var router = (0, navigation_1.useRouter)();
    var _a = (0, react_1.useState)(1), step = _a[0], setStep = _a[1];
    var _b = (0, react_1.useState)(false), showSecondOwner = _b[0], setShowSecondOwner = _b[1];
    var _c = (0, react_1.useState)(false), isDownloadingPDF = _c[0], setIsDownloadingPDF = _c[1];
    var _d = (0, react_1.useState)(null), pdfDownloadError = _d[0], setPdfDownloadError = _d[1];
    var _e = (0, react_1.useState)(false), isSubmitting = _e[0], setIsSubmitting = _e[1];
    var _f = (0, react_1.useState)(null), uploadError = _f[0], setUploadError = _f[1];
    var _g = (0, react_1.useState)({}), fileValidationErrors = _g[0], setFileValidationErrors = _g[1];
    var _h = (0, react_1.useState)({}), errors = _h[0], setErrors = _h[1];
    var _j = (0, react_1.useState)(null), globalError = _j[0], setGlobalError = _j[1];
    var _k = (0, react_1.useState)(0), lastSubmitTime = _k[0], setLastSubmitTime = _k[1];
    var _l = (0, react_1.useState)(false), sessionTimeoutWarning = _l[0], setSessionTimeoutWarning = _l[1];
    var sessionTimeoutRef = (0, react_1.useRef)(null);
    var _m = (0, react_1.useState)(false), showDraftModal = _m[0], setShowDraftModal = _m[1];
    var _o = (0, react_1.useState)(false), showSignatureModal = _o[0], setShowSignatureModal = _o[1];
    var _p = (0, react_1.useState)(0), currentSignerIndex = _p[0], setCurrentSignerIndex = _p[1]; // 0 = primary owner, 1 = second owner
    var _q = (0, react_1.useState)(""), secondOwnerSignatureImage = _q[0], setSecondOwnerSignatureImage = _q[1]; // Store second owner signature
    var _r = (0, react_1.useState)(false), draftLoaded = _r[0], setDraftLoaded = _r[1];
    var _s = (0, react_1.useState)(null), lastSaved = _s[0], setLastSaved = _s[1];
    var _t = (0, react_1.useState)(getInitialFormData()), formData = _t[0], setFormData = _t[1];
    var _u = (0, react_1.useState)(null), applicationFolderPath = _u[0], setApplicationFolderPath = _u[1];
    var _v = (0, react_1.useState)(false), isUploadingDocs = _v[0], setIsUploadingDocs = _v[1];
    var _w = (0, react_1.useState)({
        funding: true,
        business: true,
        primaryOwner: true,
        secondOwner: true,
    }), expandedSections = _w[0], setExpandedSections = _w[1];
    var toggleSection = function (section) {
        setExpandedSections(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[section] = !prev[section], _a)));
        });
    };
    // Google Places API refs
    var addressInputRef = (0, react_1.useRef)(null);
    var autocompleteRef = (0, react_1.useRef)(null);
    var homeAddressInputRef = (0, react_1.useRef)(null);
    var homeAutocompleteRef = (0, react_1.useRef)(null);
    var secondOwnerAddressInputRef = (0, react_1.useRef)(null);
    var secondOwnerAutocompleteRef = (0, react_1.useRef)(null);
    // Initialize Google Places Autocomplete
    (0, react_1.useEffect)(function () {
        var apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            console.warn("[Address Autocomplete] Google Places API key not configured");
            return;
        }
        var cancelled = false;
        function initializeAutocompletes() {
            if (cancelled)
                return;
            console.log("[Address Autocomplete] Initializing autocompletes for step", step);
            // Business Address Autocomplete (Step 2)
            if (addressInputRef.current && !autocompleteRef.current) {
                try {
                    autocompleteRef.current = new window.google.maps.places.Autocomplete(addressInputRef.current, {
                        componentRestrictions: { country: "us" },
                        fields: ["address_components", "formatted_address"],
                        types: ["address"],
                    });
                    autocompleteRef.current.addListener("place_changed", function () { return handlePlaceSelected("business"); });
                    console.log("[Address Autocomplete] ✅ Business address autocomplete initialized");
                }
                catch (error) {
                    console.error("[Address Autocomplete] ❌ Error initializing business address autocomplete:", error);
                }
            }
            // Home Address Autocomplete (Step 3)
            if (homeAddressInputRef.current && !homeAutocompleteRef.current) {
                try {
                    homeAutocompleteRef.current = new window.google.maps.places.Autocomplete(homeAddressInputRef.current, {
                        componentRestrictions: { country: "us" },
                        fields: ["address_components", "formatted_address"],
                        types: ["address"],
                    });
                    homeAutocompleteRef.current.addListener("place_changed", function () { return handlePlaceSelected("homeOwner"); });
                    console.log("[Address Autocomplete] ✅ Home address autocomplete initialized");
                }
                catch (error) {
                    console.error("[Address Autocomplete] ❌ Error initializing home address autocomplete:", error);
                }
            }
            // Second Owner Home Address Autocomplete (Step 3)
            if (secondOwnerAddressInputRef.current && !secondOwnerAutocompleteRef.current) {
                try {
                    secondOwnerAutocompleteRef.current = new window.google.maps.places.Autocomplete(secondOwnerAddressInputRef.current, {
                        componentRestrictions: { country: "us" },
                        fields: ["address_components", "formatted_address"],
                        types: ["address"],
                    });
                    secondOwnerAutocompleteRef.current.addListener("place_changed", function () { return handlePlaceSelected("secondOwner"); });
                    console.log("[Address Autocomplete] ✅ Second owner address autocomplete initialized");
                }
                catch (error) {
                    console.error("[Address Autocomplete] ❌ Error initializing second owner address autocomplete:", error);
                }
            }
        }
        // If Google Maps API is already fully loaded, just initialize
        if (window.google && window.google.maps && window.google.maps.places) {
            initializeAutocompletes();
            return function () { cancelled = true; };
        }
        // Load the script if it hasn't been added yet
        var existingScript = document.getElementById("google-maps-api");
        if (!existingScript) {
            console.log("[Address Autocomplete] Loading Google Maps API script...");
            var script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=".concat(apiKey, "&libraries=places&loading=async");
            script.async = true;
            script.id = "google-maps-api";
            script.onerror = function () {
                console.error("[Address Autocomplete] Failed to load Google Maps API script");
            };
            document.head.appendChild(script);
        }
        // Poll for google.maps.places to be available (handles both fresh load and re-mount)
        var interval = setInterval(function () {
            if (window.google && window.google.maps && window.google.maps.places) {
                clearInterval(interval);
                initializeAutocompletes();
            }
        }, 100);
        // Safety timeout - stop polling after 10s
        var timeout = setTimeout(function () {
            var _a, _b;
            clearInterval(interval);
            if (!((_b = (_a = window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.places)) {
                console.error("[Address Autocomplete] Timed out waiting for Google Maps API");
            }
        }, 10000);
        return function () {
            cancelled = true;
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [step, showSecondOwner]);
    // Handle place selection from Google Places
    var handlePlaceSelected = function (addressType) {
        var autocompleteInstance;
        if (addressType === "business") {
            autocompleteInstance = autocompleteRef.current;
        }
        else if (addressType === "homeOwner") {
            autocompleteInstance = homeAutocompleteRef.current;
        }
        else {
            autocompleteInstance = secondOwnerAutocompleteRef.current;
        }
        if (!autocompleteInstance)
            return;
        try {
            var place = autocompleteInstance.getPlace();
            if (!place.address_components)
                return;
            console.log("[Address Autocomplete] Place selected for", addressType, ":", place);
            var streetNumber = "";
            var route = "";
            var city = "";
            var stateCode = "";
            var zip = "";
            // State code to full name mapping
            var STATE_CODE_MAP = {
                AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
                CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
                HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
                KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
                MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
                MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
                NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
                OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
                SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
                VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
            };
            // Parse address components
            for (var _i = 0, _a = place.address_components; _i < _a.length; _i++) {
                var component = _a[_i];
                var types = component.types;
                if (types.includes("street_number")) {
                    streetNumber = component.long_name;
                }
                else if (types.includes("route")) {
                    route = component.long_name;
                }
                else if (types.includes("locality")) {
                    city = component.long_name;
                }
                else if (types.includes("administrative_area_level_1")) {
                    stateCode = component.short_name;
                }
                else if (types.includes("postal_code")) {
                    zip = component.long_name.substring(0, 5);
                }
            }
            var streetAddress = [streetNumber, route].filter(Boolean).join(" ");
            var fullStateName = STATE_CODE_MAP[stateCode.toUpperCase()] || stateCode;
            // Update form with parsed address based on type
            if (addressType === "business") {
                var updates_1 = {};
                var errorClears_1 = {};
                if (streetAddress) {
                    updates_1.businessAddress = streetAddress;
                    errorClears_1.businessAddress = "";
                }
                if (city) {
                    updates_1.businessCity = city;
                    errorClears_1.businessCity = "";
                }
                if (fullStateName) {
                    updates_1.businessState = fullStateName;
                    errorClears_1.businessState = "";
                }
                if (zip) {
                    updates_1.businessZip = zip;
                    errorClears_1.businessZip = "";
                }
                if (Object.keys(updates_1).length > 0) {
                    setFormData(function (prev) { return (__assign(__assign({}, prev), updates_1)); });
                    setErrors(function (prev) { return (__assign(__assign({}, prev), errorClears_1)); });
                    console.log("[Address Autocomplete] Business address updated with:", updates_1);
                }
            }
            else if (addressType === "homeOwner") {
                var updates_2 = {};
                var errorClears_2 = {};
                if (streetAddress) {
                    updates_2.homeAddress = streetAddress;
                    errorClears_2.homeAddress = "";
                }
                if (city) {
                    updates_2.city = city;
                    errorClears_2.city = "";
                }
                if (fullStateName) {
                    updates_2.state = fullStateName;
                    errorClears_2.state = "";
                }
                if (zip) {
                    updates_2.zip = zip;
                    errorClears_2.zip = "";
                }
                if (Object.keys(updates_2).length > 0) {
                    setFormData(function (prev) { return (__assign(__assign({}, prev), updates_2)); });
                    setErrors(function (prev) { return (__assign(__assign({}, prev), errorClears_2)); });
                    console.log("[Address Autocomplete] Home address updated with:", updates_2);
                }
            }
            else if (addressType === "secondOwner") {
                var updates_3 = {};
                var errorClears_3 = {};
                if (streetAddress) {
                    updates_3.secondOwnerHomeAddress = streetAddress;
                    errorClears_3.secondOwnerHomeAddress = "";
                }
                if (city) {
                    updates_3.secondOwnerCity = city;
                    errorClears_3.secondOwnerCity = "";
                }
                if (fullStateName) {
                    updates_3.secondOwnerState = fullStateName;
                    errorClears_3.secondOwnerState = "";
                }
                if (zip) {
                    updates_3.secondOwnerZipCode = zip;
                    errorClears_3.secondOwnerZipCode = "";
                }
                if (Object.keys(updates_3).length > 0) {
                    setFormData(function (prev) { return (__assign(__assign({}, prev), updates_3)); });
                    setErrors(function (prev) { return (__assign(__assign({}, prev), errorClears_3)); });
                    console.log("[Address Autocomplete] Second owner address updated with:", updates_3);
                }
            }
        }
        catch (error) {
            console.error("[Address Autocomplete] Error processing place:", error);
        }
    };
    // Clear draft from localStorage
    var clearDraft = (0, react_1.useCallback)(function () {
        try {
            localStorage.removeItem(DRAFT_STORAGE_KEY);
            localStorage.removeItem(DRAFT_STEP_KEY);
            localStorage.removeItem(PRIMARY_SIGNATURE_KEY);
            localStorage.removeItem(SECONDARY_SIGNATURE_KEY);
        }
        catch (error) {
            console.error("Error clearing draft:", error);
        }
    }, []);
    // Load draft from localStorage on mount
    (0, react_1.useEffect)(function () {
        if (DEV_MODE) {
            setDraftLoaded(true);
            return;
        }
        try {
            var savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
            var savedStep = localStorage.getItem(DRAFT_STEP_KEY);
            var primarySig = localStorage.getItem(PRIMARY_SIGNATURE_KEY);
            var secondarySig = localStorage.getItem(SECONDARY_SIGNATURE_KEY);
            if (savedDraft) {
                var parsedDraft = JSON.parse(savedDraft);
                // Check if draft has any meaningful data
                var hasData = Object.entries(parsedDraft).some(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (key === "bankStatements" || key === "otherDocuments")
                        return false;
                    if (typeof value === "boolean")
                        return value;
                    if (typeof value === "string")
                        return value.trim() !== "";
                    return false;
                });
                if (hasData) {
                    // Store draft temporarily
                    sessionStorage.setItem("temp_draft", savedDraft);
                    sessionStorage.setItem("temp_step", savedStep || "1");
                    if (primarySig)
                        sessionStorage.setItem("temp_primary_sig", primarySig);
                    if (secondarySig)
                        sessionStorage.setItem("temp_secondary_sig", secondarySig);
                    setShowDraftModal(true);
                }
            }
        }
        catch (error) {
            console.error("Error loading draft:", error);
        }
        setDraftLoaded(true);
    }, []);
    // Browser back button and session timeout handling
    (0, react_1.useEffect)(function () {
        if (!draftLoaded)
            return;
        // Handle browser back button
        var handlePopState = function () {
            console.warn("[GlobalError] Browser back button detected - checking data persistence");
            try {
                var savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
                if (!savedDraft) {
                    console.warn("[GlobalError] ❌ Form data lost after back button");
                    setGlobalError("Your previous session was cleared. Your application data may have been lost. Please start over or check your draft.");
                }
            }
            catch (error) {
                console.error("[GlobalError] Error checking data after back button:", error);
            }
        };
        window.addEventListener("popstate", handlePopState);
        // Session timeout - 30 minutes of inactivity
        var resetSessionTimeout = function () {
            if (sessionTimeoutRef.current) {
                clearTimeout(sessionTimeoutRef.current);
            }
            sessionTimeoutRef.current = setTimeout(function () {
                console.warn("[SessionTimeout] ⏱️ Session timeout after 30 minutes of inactivity");
                setSessionTimeoutWarning(true);
                setGlobalError("Your session has expired due to inactivity. Please refresh the page and log in again.");
            }, SESSION_TIMEOUT);
        };
        // Reset timeout on user activity
        var handleUserActivity = function () {
            resetSessionTimeout();
        };
        var events = [
            "mousedown",
            "keydown",
            "scroll",
            "touchstart",
            "click",
            "change",
            "input",
        ];
        events.forEach(function (event) {
            document.addEventListener(event, handleUserActivity);
        });
        // Initialize timeout
        resetSessionTimeout();
        return function () {
            window.removeEventListener("popstate", handlePopState);
            events.forEach(function (event) {
                document.removeEventListener(event, handleUserActivity);
            });
            if (sessionTimeoutRef.current) {
                clearTimeout(sessionTimeoutRef.current);
            }
        };
    }, [draftLoaded]);
    (0, react_1.useEffect)(function () {
        if (!draftLoaded || DEV_MODE || step >= 5)
            return;
        var timeoutId = setTimeout(function () {
            try {
                // Don't save file objects to localStorage
                var dataToSave = __assign({}, formData);
                delete dataToSave.bankStatements;
                delete dataToSave.otherDocuments;
                localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(dataToSave));
                localStorage.setItem(DRAFT_STEP_KEY, String(step));
                // Save signatures separately
                if (formData.signatureImage) {
                    localStorage.setItem(PRIMARY_SIGNATURE_KEY, formData.signatureImage);
                }
                if (secondOwnerSignatureImage) {
                    localStorage.setItem(SECONDARY_SIGNATURE_KEY, secondOwnerSignatureImage);
                }
                setLastSaved(new Date());
            }
            catch (error) {
                console.error("Error saving draft:", error);
            }
        }, 1000);
        return function () { return clearTimeout(timeoutId); };
    }, [formData, step, secondOwnerSignatureImage, draftLoaded]);
    // Restore draft from session storage
    var restoreDraft = (0, react_1.useCallback)(function () {
        try {
            var savedDraft = sessionStorage.getItem("temp_draft");
            var savedStep = sessionStorage.getItem("temp_step");
            var primarySig_1 = sessionStorage.getItem("temp_primary_sig");
            var secondarySig = sessionStorage.getItem("temp_secondary_sig");
            if (savedDraft) {
                var parsedDraft_1 = JSON.parse(savedDraft);
                setFormData(function (prev) { return (__assign(__assign({}, prev), parsedDraft_1)); });
                if (savedStep) {
                    setStep(parseInt(savedStep, 10));
                }
                // Check if second owner has data
                if (parsedDraft_1.secondOwnerFirstName || parsedDraft_1.secondOwnerLastName) {
                    setShowSecondOwner(true);
                }
                // Restore signatures
                if (primarySig_1) {
                    setFormData(function (prev) { return (__assign(__assign({}, prev), { signatureImage: primarySig_1 })); });
                }
                if (secondarySig) {
                    setSecondOwnerSignatureImage(secondarySig);
                }
            }
        }
        catch (error) {
            console.error("Error restoring draft:", error);
        }
        setShowDraftModal(false);
    }, []);
    // Start fresh - clear draft
    var startFresh = (0, react_1.useCallback)(function () {
        clearDraft();
        sessionStorage.removeItem("temp_draft");
        sessionStorage.removeItem("temp_step");
        sessionStorage.removeItem("temp_primary_sig");
        sessionStorage.removeItem("temp_secondary_sig");
        setFormData(getInitialFormData());
        setSecondOwnerSignatureImage("");
        setStep(1);
        setShowDraftModal(false);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [clearDraft]);
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSelectChange = function (name, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleCheckboxChange = function (checked) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { agreeToTerms: checked })); });
    };
    var handleSecondOwnerCheckboxChange = function (checked) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { secondOwnerAgreeToTerms: checked })); });
    };
    var handleFileChange = function (e) {
        var _a, _b;
        var _c = e.target, name = _c.name, files = _c.files;
        var file = (_a = files === null || files === void 0 ? void 0 : files[0]) !== null && _a !== void 0 ? _a : null;
        setFileValidationErrors(function (prev) {
            var newErrors = __assign({}, prev);
            delete newErrors[name];
            return newErrors;
        });
        if (!file) {
            console.log("[FileChange] File cleared:", name);
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = null, _a)));
            });
            return;
        }
        // Validate file format
        var extension = '.' + ((_b = file.name.split('.').pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase());
        if (!ALLOWED_EXTENSIONS.includes(extension)) {
            var msg_1 = "Invalid file format for ".concat(name === 'bankStatements' ? 'Bank Statements' : 'Other Documents', ". Allowed types: PDF, JPG, PNG");
            console.warn("[FileValidation] ❌", msg_1);
            setFileValidationErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = msg_1, _a)));
            });
            return;
        }
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            var msg_2 = "File is too large (".concat((file.size / 1024 / 1024).toFixed(2), "MB). Maximum size is 10MB");
            console.warn("[FileValidation] ❌", msg_2);
            setFileValidationErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = msg_2, _a)));
            });
            return;
        }
        if (file.size < 1024) {
            var msg_3 = "File is too small. Please select a valid document";
            console.warn("[FileValidation] ❌", msg_3);
            setFileValidationErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = msg_3, _a)));
            });
            return;
        }
        console.log("[FileValidation] ✅ File accepted:", name, file.name, "(".concat((file.size / 1024).toFixed(2), "KB)"));
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = file, _a)));
        });
    };
    // Format EIN as XX-XXXXXXX
    var formatEIN = function (value) {
        var digits = value.replace(/\D/g, "").slice(0, 9);
        if (digits.length <= 2)
            return digits;
        return "".concat(digits.slice(0, 2), "-").concat(digits.slice(2));
    };
    // Format phone as (XXX) XXX-XXXX
    var formatPhone = function (value) {
        var digits = value.replace(/\D/g, "").slice(0, 10);
        if (digits.length === 0)
            return "";
        if (digits.length <= 3)
            return "(".concat(digits);
        if (digits.length <= 6)
            return "(".concat(digits.slice(0, 3), ") ").concat(digits.slice(3));
        return "(".concat(digits.slice(0, 3), ") ").concat(digits.slice(3, 6), "-").concat(digits.slice(6));
    };
    // Format zip code as XXXXX or XXXXX-XXXX
    var formatZipCode = function (value) {
        var digits = value.replace(/\D/g, "").slice(0, 9);
        if (digits.length <= 5)
            return digits;
        return "".concat(digits.slice(0, 5), "-").concat(digits.slice(5));
    };
    // Email validation helper
    var isValidEmail = function (email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); };
    // Phone validation helper (at least 10 digits)
    var isValidPhone = function (phone) { return phone.replace(/\D/g, "").length >= 10; };
    // Zip code validation helper (5 digits)
    var isValidZip = function (zip) { return /^\d{5}(-\d{4})?$/.test(zip); };
    // Name validation - check for invalid characters
    var isValidPersonName = function (name) {
        // Allow alphanumeric, spaces, hyphens, apostrophes
        var validPattern = /^[a-zA-Z\s\-']+$/;
        return validPattern.test(name);
    };
    // EIN validation helper (XX-XXXXXXX format)
    var isValidEIN = function (ein) { return /^\d{2}-?\d{7}$/.test(ein.replace(/\s/g, "")); };
    var validateStartingInfo = function () {
        var newErrors = {};
        if (!formData.startingBusinessName.trim()) {
            newErrors.startingBusinessName = "Business name is required";
        }
        if (!formData.startingOwnerName.trim()) {
            newErrors.startingOwnerName = "Owner name is required";
        }
        else if (!isValidPersonName(formData.startingOwnerName)) {
            newErrors.startingOwnerName = "Owner name contains invalid characters. Use only letters, spaces, hyphens, and apostrophes";
        }
        if (!formData.startingPhone.trim()) {
            newErrors.startingPhone = "Phone number is required";
        }
        else if (!isValidPhone(formData.startingPhone)) {
            newErrors.startingPhone = "Invalid phone format. Please enter at least 10 digits";
        }
        if (!formData.startingEmail.trim()) {
            newErrors.startingEmail = "Email is required";
        }
        else if (!isValidEmail(formData.startingEmail)) {
            newErrors.startingEmail = "Invalid email address format";
        }
        setErrors(newErrors);
        return newErrors;
    };
    var validateStep1 = function () {
        var newErrors = {};
        if (!formData.amountRequested || formData.amountRequested.trim() === "") {
            newErrors.amountRequested = "Amount requested is required";
        }
        else if (isNaN(Number(formData.amountRequested)) || Number(formData.amountRequested) <= 0) {
            newErrors.amountRequested = "Please enter a valid amount greater than 0";
        }
        else if (Number(formData.amountRequested) < MIN_FUNDING_AMOUNT) {
            newErrors.amountRequested = "Minimum funding amount is $".concat(MIN_FUNDING_AMOUNT.toLocaleString());
        }
        if (!formData.useOfFunds || formData.useOfFunds.trim() === "") {
            newErrors.useOfFunds = "Please describe how you plan to use the funds";
        }
        setErrors(newErrors);
        return newErrors;
    };
    // Check if step 1 fields are valid (without setting errors)
    var isStep1Valid = formData.amountRequested.trim() !== "" &&
        !isNaN(Number(formData.amountRequested)) &&
        Number(formData.amountRequested) > 0 &&
        Number(formData.amountRequested) >= MIN_FUNDING_AMOUNT &&
        formData.useOfFunds.trim().length >= 1;
    // URL validation helper
    var isValidURL = function (url) {
        if (!url.trim())
            return true; // Optional field
        try {
            new URL(url.startsWith("http") ? url : "https://".concat(url));
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    // Business name validation - check for invalid characters
    var isValidBusinessName = function (name) {
        // Allow alphanumeric, spaces, hyphens, ampersands, periods, apostrophes, and commas
        var validPattern = /^[a-zA-Z0-9\s\-&.,']+$/;
        return validPattern.test(name);
    };
    // Date validation helper - check if date is in the future or too old
    var isValidBusinessDate = function (dateStr) {
        var date = new Date(dateStr);
        var today = new Date();
        var minDate = new Date("1900-01-01"); // Reasonable minimum year
        // Check if date is valid
        if (isNaN(date.getTime()))
            return false;
        // Check if date is in the future
        if (date > today)
            return false;
        // Check if date is too old (before 1900)
        if (date < minDate)
            return false;
        return true;
    };
    var validateStep2 = function () {
        var newErrors = {};
        // Business Name validation
        if (!formData.businessName.trim()) {
            newErrors.businessName = "Legal business name is required";
        }
        else if (!isValidBusinessName(formData.businessName)) {
            newErrors.businessName = "Business name contains invalid characters. Use only letters, numbers, spaces, hyphens, ampersands, periods, apostrophes, and commas";
        }
        // DBA validation - only validate if provided and different from business name
        if (formData.dba && formData.dba.trim() && formData.dba.trim() !== formData.businessName.trim()) {
            if (!isValidBusinessName(formData.dba)) {
                newErrors.dba = "DBA contains invalid characters. Use only letters, numbers, spaces, hyphens, ampersands, periods, apostrophes, and commas";
            }
        }
        // EIN/Tax ID validation
        if (!formData.federalTaxId.trim()) {
            newErrors.federalTaxId = "Federal Tax ID is required";
        }
        else if (!isValidEIN(formData.federalTaxId)) {
            newErrors.federalTaxId = "Invalid EIN format. Please use XX-XXXXXXX";
        }
        // Business Address validation
        if (!formData.businessAddress.trim()) {
            newErrors.businessAddress = "Business address is required";
        }
        // City validation
        if (!formData.businessCity.trim()) {
            newErrors.businessCity = "City is required";
        }
        // State validation
        if (!formData.businessState) {
            newErrors.businessState = "State is required";
        }
        // Zip code validation
        if (!formData.businessZip.trim()) {
            newErrors.businessZip = "Zip code is required";
        }
        else if (!isValidZip(formData.businessZip)) {
            newErrors.businessZip = "Invalid zip code format. Use XXXXX or XXXXX-XXXX";
        }
        // Phone validation
        if (!formData.businessPhone.trim()) {
            newErrors.businessPhone = "Business phone is required";
        }
        else if (!isValidPhone(formData.businessPhone)) {
            newErrors.businessPhone = "Invalid phone format. Please enter at least 10 digits";
        }
        // Email validation
        if (!formData.businessEmail.trim()) {
            newErrors.businessEmail = "Business email is required";
        }
        else if (!isValidEmail(formData.businessEmail)) {
            newErrors.businessEmail = "Invalid email address format";
        }
        // Industry validation
        if (!formData.industry) {
            newErrors.industry = "Please select an industry";
        }
        // Business Start Date validation
        if (!formData.businessStartDate) {
            newErrors.businessStartDate = "Business start date is required";
        }
        else if (!isValidBusinessDate(formData.businessStartDate)) {
            var date = new Date(formData.businessStartDate);
            var today = new Date();
            if (date > today) {
                newErrors.businessStartDate = "Business start date cannot be in the future";
            }
            else {
                newErrors.businessStartDate = "Invalid business start date. Date must be after 1900";
            }
        }
        // Entity Type validation
        if (!formData.entityType) {
            newErrors.entityType = "Please select an entity type";
        }
        // Years in Business validation
        if (!formData.yearsInBusiness.trim()) {
            newErrors.yearsInBusiness = "Years in business is required";
        }
        else if (isNaN(Number(formData.yearsInBusiness)) || Number(formData.yearsInBusiness) < 0) {
            newErrors.yearsInBusiness = "Please enter a valid number (0 or greater)";
        }
        // Annual Revenue validation
        if (!formData.annualRevenue) {
            newErrors.annualRevenue = "Please select an annual revenue range";
        }
        // Owner Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        }
        else if (!isValidEmail(formData.email)) {
            newErrors.email = "Invalid email address format";
        }
        setErrors(newErrors);
        return newErrors;
    };
    // Check if step 2 fields are valid (without setting errors)
    var isStep2Valid = formData.businessName.trim() !== "" &&
        isValidBusinessName(formData.businessName) &&
        (!formData.dba || !formData.dba.trim() || isValidBusinessName(formData.dba)) &&
        formData.federalTaxId.trim() !== "" &&
        isValidEIN(formData.federalTaxId) &&
        formData.businessAddress.trim() !== "" &&
        formData.businessCity.trim() !== "" &&
        formData.businessState !== "" &&
        formData.businessZip.trim() !== "" &&
        isValidZip(formData.businessZip) &&
        formData.businessPhone.trim() !== "" &&
        isValidPhone(formData.businessPhone) &&
        formData.businessEmail.trim() !== "" &&
        isValidEmail(formData.businessEmail) &&
        formData.industry !== "" &&
        formData.businessStartDate !== "" &&
        isValidBusinessDate(formData.businessStartDate) &&
        formData.entityType !== "" &&
        formData.yearsInBusiness.trim() !== "" &&
        !isNaN(Number(formData.yearsInBusiness)) &&
        Number(formData.yearsInBusiness) >= 0 &&
        formData.annualRevenue !== "" &&
        formData.email.trim() !== "" &&
        isValidEmail(formData.email);
    // SSN validation helper (9 digits, with or without dashes)
    var isValidSSN = function (ssn) {
        var digits = ssn.replace(/\D/g, "");
        return digits.length === 9;
    };
    // Format SSN as XXX-XX-XXXX
    var formatSSN = function (value) {
        var digits = value.replace(/\D/g, "").slice(0, 9);
        if (digits.length <= 3)
            return digits;
        if (digits.length <= 5)
            return "".concat(digits.slice(0, 3), "-").concat(digits.slice(3));
        return "".concat(digits.slice(0, 3), "-").concat(digits.slice(3, 5), "-").concat(digits.slice(5));
    };
    // Date validation helper - check if date is valid and person is 18+
    var isValidDOB = function (dobStr) {
        var dob = new Date(dobStr);
        var today = new Date();
        // Check if date is valid
        if (isNaN(dob.getTime()))
            return false;
        // Check if date is in the future
        if (dob > today)
            return false;
        // Calculate age
        var age = today.getFullYear() - dob.getFullYear();
        var monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        // Must be at least 18 years old
        if (age < 18)
            return false;
        return true;
    };
    // Get DOB error message specific to the issue
    var getDOBErrorMessage = function (dobStr) {
        var dob = new Date(dobStr);
        var today = new Date();
        if (dob > today) {
            return "Date of birth cannot be in the future";
        }
        var age = today.getFullYear() - dob.getFullYear();
        var monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 18) {
            return "Applicant must be at least 18 years old";
        }
        return "Invalid date of birth";
    };
    var validateStep3 = function () {
        var newErrors = {};
        // Primary Owner validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        else if (!isValidPersonName(formData.firstName)) {
            newErrors.firstName = "First name contains invalid characters. Use only letters, spaces, hyphens, and apostrophes";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        else if (!isValidPersonName(formData.lastName)) {
            newErrors.lastName = "Last name contains invalid characters. Use only letters, spaces, hyphens, and apostrophes";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        else if (!isValidPhone(formData.phone)) {
            newErrors.phone = "Invalid phone format. Please enter at least 10 digits";
        }
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        }
        else if (!isValidDOB(formData.dateOfBirth)) {
            newErrors.dateOfBirth = getDOBErrorMessage(formData.dateOfBirth);
        }
        if (!formData.ssn.trim()) {
            newErrors.ssn = "Social Security Number is required";
        }
        else if (!isValidSSN(formData.ssn)) {
            newErrors.ssn = "Invalid SSN format. Please use XXX-XX-XXXX";
        }
        if (!formData.homeAddress.trim()) {
            newErrors.homeAddress = "Home address is required";
        }
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }
        if (!formData.state) {
            newErrors.state = "State is required";
        }
        if (!formData.zip.trim()) {
            newErrors.zip = "Zip code is required";
        }
        else if (!isValidZip(formData.zip)) {
            newErrors.zip = "Invalid zip code format. Use XXXXX or XXXXX-XXXX";
        }
        if (!formData.creditScore) {
            newErrors.creditScore = "Please select a credit score range";
        }
        if (!formData.ownershipPercentage.trim()) {
            newErrors.ownershipPercentage = "Ownership percentage is required";
        }
        else if (isNaN(Number(formData.ownershipPercentage))) {
            newErrors.ownershipPercentage = "Please enter a valid percentage";
        }
        else if (Number(formData.ownershipPercentage) <= 0) {
            newErrors.ownershipPercentage = "Ownership percentage must be greater than 0%";
        }
        else if (Number(formData.ownershipPercentage) > 100) {
            newErrors.ownershipPercentage = "Ownership percentage cannot exceed 100%";
        }
        // Second Owner validation (if added)
        if (showSecondOwner) {
            if (!formData.secondOwnerFirstName.trim()) {
                newErrors.secondOwnerFirstName = "Second owner first name is required";
            }
            else if (!isValidPersonName(formData.secondOwnerFirstName)) {
                newErrors.secondOwnerFirstName = "First name contains invalid characters. Use only letters, spaces, hyphens, and apostrophes";
            }
            if (!formData.secondOwnerLastName.trim()) {
                newErrors.secondOwnerLastName = "Second owner last name is required";
            }
            else if (!isValidPersonName(formData.secondOwnerLastName)) {
                newErrors.secondOwnerLastName = "Last name contains invalid characters. Use only letters, spaces, hyphens, and apostrophes";
            }
            if (!formData.secondOwnerPhone.trim()) {
                newErrors.secondOwnerPhone = "Phone number is required";
            }
            else if (!isValidPhone(formData.secondOwnerPhone)) {
                newErrors.secondOwnerPhone = "Invalid phone format. Please enter at least 10 digits";
            }
            if (!formData.secondOwnerDateOfBirth) {
                newErrors.secondOwnerDateOfBirth = "Date of birth is required";
            }
            else if (!isValidDOB(formData.secondOwnerDateOfBirth)) {
                newErrors.secondOwnerDateOfBirth = getDOBErrorMessage(formData.secondOwnerDateOfBirth);
            }
            if (!formData.secondOwnerSsn.trim()) {
                newErrors.secondOwnerSsn = "Social Security Number is required";
            }
            else if (!isValidSSN(formData.secondOwnerSsn)) {
                newErrors.secondOwnerSsn = "Invalid SSN format. Please use XXX-XX-XXXX";
            }
            if (!formData.secondOwnerHomeAddress.trim()) {
                newErrors.secondOwnerHomeAddress = "Home address is required";
            }
            if (!formData.secondOwnerCity.trim()) {
                newErrors.secondOwnerCity = "City is required";
            }
            if (!formData.secondOwnerState) {
                newErrors.secondOwnerState = "State is required";
            }
            if (!formData.secondOwnerZipCode.trim()) {
                newErrors.secondOwnerZipCode = "Zip code is required";
            }
            else if (!isValidZip(formData.secondOwnerZipCode)) {
                newErrors.secondOwnerZipCode = "Invalid zip code format. Use XXXXX or XXXXX-XXXX";
            }
            if (!formData.secondOwnerCreditScore) {
                newErrors.secondOwnerCreditScore = "Please select a credit score range";
            }
            if (!formData.secondOwnerPercentageOwnership.trim()) {
                newErrors.secondOwnerPercentageOwnership = "Ownership percentage is required";
            }
            else if (isNaN(Number(formData.secondOwnerPercentageOwnership))) {
                newErrors.secondOwnerPercentageOwnership = "Please enter a valid percentage";
            }
            else if (Number(formData.secondOwnerPercentageOwnership) <= 0) {
                newErrors.secondOwnerPercentageOwnership = "Ownership percentage must be greater than 0%";
            }
            else if (Number(formData.secondOwnerPercentageOwnership) > 100) {
                newErrors.secondOwnerPercentageOwnership = "Ownership percentage cannot exceed 100%";
            }
            // Combined ownership validation
            var primaryOwnership = Number(formData.ownershipPercentage) || 0;
            var secondaryOwnership = Number(formData.secondOwnerPercentageOwnership) || 0;
            var totalOwnership = primaryOwnership + secondaryOwnership;
            if (totalOwnership !== 100) {
                newErrors.ownershipPercentage = "Combined ownership must equal 100% (currently ".concat(totalOwnership, "%)");
            }
        }
        setErrors(newErrors);
        return newErrors;
    };
    // Check if step 3 fields are valid (without setting errors)
    var isStep3Valid = formData.firstName.trim() !== "" &&
        isValidPersonName(formData.firstName) &&
        formData.lastName.trim() !== "" &&
        isValidPersonName(formData.lastName) &&
        formData.phone.trim() !== "" &&
        isValidPhone(formData.phone) &&
        formData.dateOfBirth !== "" &&
        isValidDOB(formData.dateOfBirth) &&
        formData.ssn.trim() !== "" &&
        isValidSSN(formData.ssn) &&
        formData.homeAddress.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.state !== "" &&
        formData.zip.trim() !== "" &&
        isValidZip(formData.zip) &&
        formData.creditScore !== "" &&
        formData.ownershipPercentage.trim() !== "" &&
        !isNaN(Number(formData.ownershipPercentage)) &&
        Number(formData.ownershipPercentage) > 0 &&
        Number(formData.ownershipPercentage) <= 100 &&
        (!showSecondOwner || (formData.secondOwnerFirstName.trim() !== "" &&
            isValidPersonName(formData.secondOwnerFirstName) &&
            formData.secondOwnerLastName.trim() !== "" &&
            isValidPersonName(formData.secondOwnerLastName) &&
            formData.secondOwnerPhone.trim() !== "" &&
            isValidPhone(formData.secondOwnerPhone) &&
            formData.secondOwnerDateOfBirth !== "" &&
            isValidDOB(formData.secondOwnerDateOfBirth) &&
            formData.secondOwnerSsn.trim() !== "" &&
            isValidSSN(formData.secondOwnerSsn) &&
            formData.secondOwnerHomeAddress.trim() !== "" &&
            formData.secondOwnerCity.trim() !== "" &&
            formData.secondOwnerState !== "" &&
            formData.secondOwnerZipCode.trim() !== "" &&
            isValidZip(formData.secondOwnerZipCode) &&
            formData.secondOwnerCreditScore !== "" &&
            formData.secondOwnerPercentageOwnership.trim() !== "" &&
            !isNaN(Number(formData.secondOwnerPercentageOwnership)) &&
            Number(formData.secondOwnerPercentageOwnership) > 0 &&
            Number(formData.secondOwnerPercentageOwnership) <= 100 &&
            (Number(formData.ownershipPercentage) + Number(formData.secondOwnerPercentageOwnership) === 100)));
    // Helper function to scroll to the first field with an error
    var scrollToFirstError = function (errorObj) {
        if (Object.keys(errorObj).length === 0)
            return;
        var firstErrorKey = Object.keys(errorObj)[0];
        // Try multiple times to find and scroll to the element
        var attemptScroll = function () {
            var element = document.getElementById(firstErrorKey);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                // Try to focus if it's an input element
                if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
                    element.focus();
                }
                return true;
            }
            return false;
        };
        // Try immediately, then wait for DOM updates
        if (!attemptScroll()) {
            setTimeout(attemptScroll, 50);
        }
    };
    var nextStep = function () {
        // Validate current step before proceeding
        var validationErrors = {};
        if (step === 1) {
            validationErrors = validateStartingInfo();
            if (Object.keys(validationErrors).length > 0) {
                scrollToFirstError(validationErrors);
                return;
            }
            // Autopopulate next steps with starting information
            setFormData(function (prev) { return (__assign(__assign({}, prev), { businessName: prev.startingBusinessName, firstName: prev.startingOwnerName.split(" ")[0] || prev.startingOwnerName, lastName: prev.startingOwnerName.includes(" ") ? prev.startingOwnerName.split(" ").slice(1).join(" ") : "", phone: prev.startingPhone, businessPhone: prev.startingPhone, businessEmail: prev.startingEmail, email: prev.startingEmail })); });
        }
        else if (step === 2) {
            validationErrors = validateStep1();
            if (Object.keys(validationErrors).length > 0) {
                scrollToFirstError(validationErrors);
                return;
            }
        }
        else if (step === 3) {
            validationErrors = validateStep2();
            if (Object.keys(validationErrors).length > 0) {
                scrollToFirstError(validationErrors);
                return;
            }
        }
        else if (step === 4) {
            validationErrors = validateStep3();
            if (Object.keys(validationErrors).length > 0) {
                scrollToFirstError(validationErrors);
                return;
            }
        }
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setErrors({}); // Clear errors when moving to next step
        setStep(function (prev) { return prev + 1; });
    };
    var prevStep = function () {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setStep(function (prev) { return prev - 1; });
    };
    // Open signature modal when user clicks Submit
    var openSignatureModal = function (e) {
        e.preventDefault();
        setShowSignatureModal(true);
    };
    // Open signature modal for a specific owner (0 = primary, 1 = second)
    var openSignatureModalForOwner = function (ownerIndex) {
        setCurrentSignerIndex(ownerIndex);
        setShowSignatureModal(true);
    };
    // Check if all required signatures are collected
    var hasTwoOwners = showSecondOwner && formData.secondOwnerFirstName && formData.secondOwnerLastName;
    var allSignaturesCollected = formData.signatureImage && (!hasTwoOwners || secondOwnerSignatureImage);
    // Handle direct submission when all signatures are already collected
    var handleSubmitApplication = function () { return __awaiter(_this, void 0, void 0, function () {
        var signingCertificate, ipResponse, ipData, ipError_1, updatedFormData, pdfBytes, pdfResult, errorMsg_1, pdfError_1, pdfErrorMsg_1, applicationFolder, uploadResult, uploadError_2, uploadError_1, uploadErrorMsg_1, result, submitError_1, submitErrorMsg_1, error_1, errorMsg_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!allSignaturesCollected) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { signature: "All owner signatures are required before submitting" })); });
                        return [2 /*return*/];
                    }
                    signingCertificate = {
                        ipAddress: "Unavailable",
                        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Unknown",
                        signedAt: new Date().toISOString(),
                        signingId: (0, uuid_1.v4)(),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    console.log("[Submit] Fetching signer IP address...");
                    return [4 /*yield*/, fetch("/api/ip")];
                case 2:
                    ipResponse = _a.sent();
                    if (!ipResponse.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, ipResponse.json()];
                case 3:
                    ipData = _a.sent();
                    signingCertificate.ipAddress = ipData.ip || "Unavailable";
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    ipError_1 = _a.sent();
                    console.warn("[Submit] Could not fetch IP address, continuing without:", ipError_1);
                    return [3 /*break*/, 6];
                case 6:
                    updatedFormData = __assign(__assign({}, formData), { secondOwnerSignatureImage: secondOwnerSignatureImage || "", secondOwnerSignature: hasTwoOwners ? "".concat(formData.secondOwnerFirstName, " ").concat(formData.secondOwnerLastName) : "", signatureDate: new Date().toISOString().split('T')[0], signingCertificate: signingCertificate });
                    setFormData(updatedFormData);
                    setIsSubmitting(true);
                    setErrors({});
                    console.log("[Submit] Form submission started with signature(s) and signing certificate");
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 20, , 21]);
                    // Generate the PDF
                    console.log("[Submit] Generating PDF for email attachment...");
                    pdfBytes = null;
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, (0, download_application_pdf_1.downloadApplicationPDF)(updatedFormData)];
                case 9:
                    pdfResult = _a.sent();
                    if (!pdfResult) {
                        throw new Error("PDF generation returned no result");
                    }
                    if (pdfResult.success && pdfResult.pdfBytes) {
                        // PDF bytes are already in array format
                        pdfBytes = pdfResult.pdfBytes;
                        console.log("[Submit] PDF generated successfully, size:", pdfBytes.length, "bytes");
                    }
                    else {
                        errorMsg_1 = (pdfResult === null || pdfResult === void 0 ? void 0 : pdfResult.error) || 'Unknown error';
                        console.error("[Submit] PDF generation failed:", errorMsg_1);
                        setIsSubmitting(false);
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "PDF generation failed: ".concat(errorMsg_1, ". Please try again or contact support.") })); });
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 11];
                case 10:
                    pdfError_1 = _a.sent();
                    pdfErrorMsg_1 = pdfError_1 instanceof Error ? pdfError_1.message : String(pdfError_1);
                    console.error("[Submit] PDF generation exception:", pdfErrorMsg_1);
                    setIsSubmitting(false);
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Failed to create application PDF: ".concat(pdfErrorMsg_1, ". Please try again or contact support.") })); });
                    return [2 /*return*/];
                case 11:
                    // Upload PDF to organized folder
                    console.log("[Submit] Uploading application PDF to blob storage...");
                    applicationFolder = null;
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, (0, upload_application_documents_1.uploadApplicationDocuments)((formData.businessName || formData.legalBusinessName || "Unknown Business"), pdfBytes || undefined, undefined, undefined, undefined, undefined)];
                case 13:
                    uploadResult = _a.sent();
                    if (uploadResult.success && uploadResult.folder) {
                        applicationFolder = uploadResult.folder;
                        setApplicationFolderPath(uploadResult.folder.folderPath);
                        console.log("[Submit] PDF uploaded successfully to:", applicationFolder.folderPath);
                    }
                    else {
                        uploadError_2 = uploadResult.error || "Unknown error";
                        console.error("[Submit] PDF upload failed:", uploadError_2);
                        setIsSubmitting(false);
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Failed to upload PDF to storage: ".concat(uploadError_2, ". Your application was not submitted. Please try again.") })); });
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 15];
                case 14:
                    uploadError_1 = _a.sent();
                    uploadErrorMsg_1 = uploadError_1 instanceof Error ? uploadError_1.message : String(uploadError_1);
                    console.error("[Submit] PDF upload exception:", uploadErrorMsg_1);
                    setIsSubmitting(false);
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Failed to upload PDF: ".concat(uploadErrorMsg_1, ". Your application was not submitted. Please try again.") })); });
                    return [2 /*return*/];
                case 15:
                    // Submit application to API
                    console.log("[Submit] Submitting application to API...");
                    _a.label = 16;
                case 16:
                    _a.trys.push([16, 18, , 19]);
                    return [4 /*yield*/, (0, submit_application_1.submitApplication)(updatedFormData, applicationFolder)];
                case 17:
                    result = _a.sent();
                    console.log("[Submit] Submit result:", result);
                    if (result.success) {
                        console.log("[Submit] Application submitted successfully!");
                        setIsSubmitting(false);
                        nextStep();
                    }
                    else {
                        throw new Error(result.error || "Submission failed");
                    }
                    return [3 /*break*/, 19];
                case 18:
                    submitError_1 = _a.sent();
                    submitErrorMsg_1 = submitError_1 instanceof Error ? submitError_1.message : String(submitError_1);
                    console.error("[Submit] API submission failed:", submitErrorMsg_1);
                    setIsSubmitting(false);
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Application submission failed: ".concat(submitErrorMsg_1, ". Please try again.") })); });
                    return [3 /*break*/, 19];
                case 19: return [3 /*break*/, 21];
                case 20:
                    error_1 = _a.sent();
                    errorMsg_2 = error_1 instanceof Error ? error_1.message : String(error_1);
                    console.error("[Submit] Unexpected error:", errorMsg_2);
                    setIsSubmitting(false);
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "An unexpected error occurred: ".concat(errorMsg_2, ". Please try again.") })); });
                    return [3 /*break*/, 21];
                case 21: return [2 /*return*/];
            }
        });
    }); };
    // Handle signature modal close without signing
    var handleSignatureModalClose = function () {
        setShowSignatureModal(false);
        setErrors(function (prev) { return (__assign(__assign({}, prev), { signature: "" })); });
    };
    // Validate signature is not empty
    var validateSignature = function (signatureDataUrl) {
        if (!signatureDataUrl || signatureDataUrl.trim() === "") {
            setErrors(function (prev) { return (__assign(__assign({}, prev), { signature: "Please sign the application before submitting" })); });
            return false;
        }
        return true;
    };
    // Handle inline signature capture (without submission) - for Step 4 owner dropdowns
    var handleInlineSignature = function (signatureDataUrl) {
        if (!validateSignature(signatureDataUrl)) {
            return;
        }
        if (currentSignerIndex === 0) {
            // Primary owner signed
            setFormData(function (prev) { return (__assign(__assign({}, prev), { signatureImage: signatureDataUrl, signature: "".concat(prev.firstName, " ").concat(prev.lastName) })); });
            // Save primary signature to localStorage immediately
            try {
                localStorage.setItem(PRIMARY_SIGNATURE_KEY, signatureDataUrl);
            }
            catch (error) {
                console.error("Error saving primary signature:", error);
            }
        }
        else {
            // Second owner signed
            setSecondOwnerSignatureImage(signatureDataUrl);
            // Save secondary signature to localStorage immediately
            try {
                localStorage.setItem(SECONDARY_SIGNATURE_KEY, signatureDataUrl);
            }
            catch (error) {
                console.error("Error saving secondary signature:", error);
            }
        }
        setShowSignatureModal(false);
        setCurrentSignerIndex(0); // Reset signer index
    };
    // Handle signature and submit
    var handleSignatureAndSubmit = function (signatureDataUrl) { return __awaiter(_this, void 0, void 0, function () {
        var hasTwoOwners, signingCertificate, ipResponse, ipData, ipError_2, updatedFormData, sigToSave, pdfBytes, pdfResult, errorMsg_3, pdfError_2, pdfErrorMsg_2, applicationFolder, uploadResult, uploadError_4, uploadError_3, uploadErrorMsg_2, result, completedApps, completedApp, archiveErrorMsg, clearErrorMsg, errorMsg_4, apiError_1, apiErrorMsg, userMsg_1, error_2, errorMessage_1, errorStack;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Validate signature is not empty
                    if (!validateSignature(signatureDataUrl)) {
                        return [2 /*return*/];
                    }
                    hasTwoOwners = showSecondOwner && formData.secondOwnerFirstName && formData.secondOwnerLastName;
                    if (currentSignerIndex === 0 && hasTwoOwners) {
                        // Primary owner just signed - store signature and show second owner modal
                        setFormData(function (prev) { return (__assign(__assign({}, prev), { signatureImage: signatureDataUrl, signature: prev.signature || "".concat(prev.firstName, " ").concat(prev.lastName) })); });
                        // Save primary signature to localStorage
                        try {
                            localStorage.setItem(PRIMARY_SIGNATURE_KEY, signatureDataUrl);
                        }
                        catch (error) {
                            console.error("Error saving primary signature:", error);
                        }
                        setShowSignatureModal(false);
                        // Brief delay before showing second owner modal for better UX
                        setTimeout(function () {
                            setCurrentSignerIndex(1);
                            setShowSignatureModal(true);
                        }, 500);
                        return [2 /*return*/];
                    }
                    signingCertificate = {
                        ipAddress: "Unavailable",
                        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Unknown",
                        signedAt: new Date().toISOString(),
                        signingId: (0, uuid_1.v4)(),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    console.log("[Submit] Fetching signer IP address...");
                    return [4 /*yield*/, fetch("/api/ip")];
                case 2:
                    ipResponse = _a.sent();
                    if (!ipResponse.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, ipResponse.json()];
                case 3:
                    ipData = _a.sent();
                    signingCertificate.ipAddress = ipData.ip || "Unavailable";
                    console.log("[Submit] Signer IP captured:", signingCertificate.ipAddress);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    ipError_2 = _a.sent();
                    console.warn("[Submit] Could not fetch IP address, continuing without:", ipError_2);
                    return [3 /*break*/, 6];
                case 6:
                    console.log("[Submit] Signing certificate generated:", {
                        signingId: signingCertificate.signingId,
                        signedAt: signingCertificate.signedAt,
                        ipAddress: signingCertificate.ipAddress,
                    });
                    updatedFormData = __assign(__assign(__assign(__assign({}, formData), { signatureImage: formData.signatureImage || signatureDataUrl, signature: formData.signature || "".concat(formData.firstName, " ").concat(formData.lastName) }), (currentSignerIndex === 1 ? { secondOwnerSignatureImage: signatureDataUrl } : {})), { secondOwnerSignature: currentSignerIndex === 1 ? "".concat(formData.secondOwnerFirstName, " ").concat(formData.secondOwnerLastName) : "", signatureDate: new Date().toISOString().split('T')[0], signingCertificate: signingCertificate });
                    setFormData(updatedFormData);
                    // Save signatures to localStorage when capturing them during submission
                    if (currentSignerIndex === 0 && (updatedFormData.signatureImage || formData.signatureImage)) {
                        try {
                            sigToSave = updatedFormData.signatureImage || formData.signatureImage;
                            if (sigToSave) {
                                localStorage.setItem(PRIMARY_SIGNATURE_KEY, sigToSave);
                            }
                        }
                        catch (error) {
                            console.error("Error saving primary signature:", error);
                        }
                    }
                    else if (currentSignerIndex === 1 && signatureDataUrl) {
                        try {
                            localStorage.setItem(SECONDARY_SIGNATURE_KEY, signatureDataUrl);
                            setSecondOwnerSignatureImage(signatureDataUrl);
                        }
                        catch (error) {
                            console.error("Error saving secondary signature:", error);
                        }
                    }
                    setShowSignatureModal(false);
                    setCurrentSignerIndex(0); // Reset for next submission
                    setIsSubmitting(true);
                    setErrors({}); // Clear any previous errors
                    console.log("[Submit] Form submission started with signature(s) and signing certificate");
                    console.log("[Submit] Submitting application with data:", updatedFormData);
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 20, , 21]);
                    // First, generate the PDF
                    console.log("[Submit] Generating PDF for email attachment...");
                    pdfBytes = null;
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, (0, download_application_pdf_1.downloadApplicationPDF)(updatedFormData)];
                case 9:
                    pdfResult = _a.sent();
                    if (!pdfResult) {
                        throw new Error("PDF generation returned no result");
                    }
                    if (pdfResult.success && pdfResult.pdfBytes) {
                        // PDF bytes are already in array format
                        pdfBytes = pdfResult.pdfBytes;
                        console.log("[Submit] PDF generated successfully, size:", pdfBytes.length, "bytes");
                    }
                    else {
                        errorMsg_3 = (pdfResult === null || pdfResult === void 0 ? void 0 : pdfResult.error) || 'Unknown error';
                        console.error("[Submit] PDF generation failed:", errorMsg_3);
                        setIsSubmitting(false);
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "PDF generation failed: ".concat(errorMsg_3, ". Please try again or contact support.") })); });
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 11];
                case 10:
                    pdfError_2 = _a.sent();
                    pdfErrorMsg_2 = pdfError_2 instanceof Error ? pdfError_2.message : String(pdfError_2);
                    console.error("[Submit] PDF generation exception:", pdfErrorMsg_2);
                    setIsSubmitting(false);
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Failed to create application PDF: ".concat(pdfErrorMsg_2, ". Please try again or contact support.") })); });
                    return [2 /*return*/];
                case 11:
                    // Upload PDF to organized folder
                    console.log("[Submit] Uploading application PDF to blob storage...");
                    applicationFolder = null;
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, (0, upload_application_documents_1.uploadApplicationDocuments)((formData.businessName || formData.legalBusinessName || "Unknown Business"), pdfBytes || undefined, undefined, // No bank statements yet - uploaded in Step 6
                        undefined, undefined, // No other documents yet - uploaded in Step 6
                        undefined)];
                case 13:
                    uploadResult = _a.sent();
                    if (uploadResult.success && uploadResult.folder) {
                        applicationFolder = uploadResult.folder;
                        setApplicationFolderPath(uploadResult.folder.folderPath);
                        console.log("[Submit] PDF uploaded successfully to:", applicationFolder.folderPath);
                    }
                    else {
                        uploadError_4 = uploadResult.error || "Unknown error";
                        console.error("[Submit] PDF upload failed:", uploadError_4);
                        setIsSubmitting(false);
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Failed to upload PDF to storage: ".concat(uploadError_4, ". Your application was not submitted. Please try again.") })); });
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 15];
                case 14:
                    uploadError_3 = _a.sent();
                    uploadErrorMsg_2 = uploadError_3 instanceof Error ? uploadError_3.message : String(uploadError_3);
                    console.error("[Submit] PDF upload exception:", uploadErrorMsg_2);
                    setIsSubmitting(false);
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Failed to upload PDF: ".concat(uploadErrorMsg_2, ". Your application was not submitted. Please try again.") })); });
                    return [2 /*return*/];
                case 15:
                    // Submit application to API
                    console.log("[Submit] Submitting application to API...");
                    _a.label = 16;
                case 16:
                    _a.trys.push([16, 18, , 19]);
                    return [4 /*yield*/, (0, submit_application_1.submitApplication)(updatedFormData, applicationFolder)];
                case 17:
                    result = _a.sent();
                    console.log("[Submit] Submit result:", result);
                    if (result.success) {
                        console.log("[Submit] Application submitted successfully!");
                        if (result.emailSent) {
                            console.log("[Submit] Confirmation email sent to:", formData.email);
                        }
                        else {
                            console.warn("[Submit] Application submitted but email notification failed");
                        }
                        // Archive completed application to localStorage before clearing draft
                        try {
                            completedApps = JSON.parse(localStorage.getItem(APPLICATION_COMPLETED_KEY) || "[]");
                            completedApp = {
                                submittedAt: new Date().toISOString(),
                                applicationId: (0, uuid_1.v4)(),
                                email: formData.email,
                                businessName: formData.businessName,
                                formData: updatedFormData,
                                primarySignature: localStorage.getItem(PRIMARY_SIGNATURE_KEY),
                                secondarySignature: localStorage.getItem(SECONDARY_SIGNATURE_KEY),
                            };
                            completedApps.push(completedApp);
                            localStorage.setItem(APPLICATION_COMPLETED_KEY, JSON.stringify(completedApps));
                            console.log("[Submit] Completed application archived to localStorage");
                        }
                        catch (archiveError) {
                            archiveErrorMsg = archiveError instanceof Error ? archiveError.message : String(archiveError);
                            console.warn("[Submit] Failed to archive completed application:", archiveErrorMsg);
                            // Don't block submission on archive failure
                        }
                        // Clear draft from localStorage
                        try {
                            clearDraft();
                            console.log("[Submit] Draft cleared from localStorage");
                        }
                        catch (clearError) {
                            clearErrorMsg = clearError instanceof Error ? clearError.message : String(clearError);
                            console.warn("[Submit] Failed to clear draft:", clearErrorMsg);
                            // Don't block submission on draft clear failure
                        }
                        setIsSubmitting(false);
                        nextStep();
                    }
                    else {
                        console.error("[Submit] Application submission API failed:", result.error);
                        setIsSubmitting(false);
                        errorMsg_4 = result.error || "Unknown error";
                        if (errorMsg_4.includes("network") || errorMsg_4.includes("Network")) {
                            errorMsg_4 = "Network connection error. Please check your internet connection and try again.";
                        }
                        else if (errorMsg_4.includes("500") || errorMsg_4.includes("Internal Server Error")) {
                            errorMsg_4 = "Server error (500). Our system is temporarily unavailable. Please try again in a few moments.";
                        }
                        else if (errorMsg_4.includes("timeout") || errorMsg_4.includes("Timeout")) {
                            errorMsg_4 = "Request timeout. The submission took too long. Please try again.";
                        }
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Application submission failed: ".concat(errorMsg_4, ". Please try again or contact support at vivsin1995@gmail.com") })); });
                    }
                    return [3 /*break*/, 19];
                case 18:
                    apiError_1 = _a.sent();
                    apiErrorMsg = apiError_1 instanceof Error ? apiError_1.message : String(apiError_1);
                    console.error("[Submit] Application submission exception:", apiErrorMsg);
                    setIsSubmitting(false);
                    userMsg_1 = apiErrorMsg;
                    if (apiErrorMsg.includes("NetworkError") || apiErrorMsg.includes("Failed to fetch")) {
                        userMsg_1 = "Network error: Unable to reach the server. Please check your internet connection and try again.";
                    }
                    else if (apiErrorMsg.includes("timeout")) {
                        userMsg_1 = "Request timeout: The server took too long to respond. Please try again.";
                    }
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "Unexpected error during submission: ".concat(userMsg_1, ". Please try again or contact support at vivsin1995@gmail.com") })); });
                    return [3 /*break*/, 19];
                case 19: return [3 /*break*/, 21];
                case 20:
                    error_2 = _a.sent();
                    errorMessage_1 = error_2 instanceof Error ? error_2.message : "Unknown error";
                    errorStack = error_2 instanceof Error ? error_2.stack : "";
                    console.error("[Submit] Unexpected error in handleSignatureAndSubmit:", error_2);
                    console.error("[Submit] Error details:", errorMessage_1, errorStack);
                    setIsSubmitting(false);
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { submit: "An unexpected error occurred: ".concat(errorMessage_1, ". Please contact support at vivsin1995@gmail.com with this error message.") })); });
                    return [3 /*break*/, 21];
                case 21: return [2 /*return*/];
            }
        });
    }); };
    var handleDocumentUpload = function () { return __awaiter(_this, void 0, void 0, function () {
        var now, msg, msg, fileToBase64, bankStatementsBase64, bankStatementsFilename, otherDocumentsBase64, otherDocumentsFilename, error_3, msg, error_4, msg, uploadResult, uploadError_5, msg, userMessage, errorMsg, userMessage, error_5, userMessage;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = Date.now();
                    // Prevent double submissions (debounce)
                    if (now - lastSubmitTime < 1000) {
                        console.warn("[Docs] ❌ Double submission prevented");
                        setGlobalError("Please wait - submission already in progress");
                        return [2 /*return*/];
                    }
                    setLastSubmitTime(now);
                    console.log("[Docs] handleDocumentUpload called");
                    setUploadError(null);
                    setGlobalError(null);
                    // ===== VALIDATION =====
                    // Validation: Bank statements required
                    if (!formData.bankStatements) {
                        msg = "❌ Bank Statements file is required. Please select a document (PDF, JPG, or PNG) before uploading.";
                        console.error("[Docs] Validation error:", msg);
                        setUploadError(msg);
                        return [2 /*return*/];
                    }
                    // Validation: Application folder path from Step 4
                    if (!applicationFolderPath) {
                        msg = "❌ Application folder from Step 4 not found. Please complete Step 4 (sign your application) first, then return to Step 6.";
                        console.error("[Docs] Missing folder path:", msg);
                        setUploadError(msg);
                        return [2 /*return*/];
                    }
                    setIsUploadingDocs(true);
                    console.log("[Docs] Starting document upload...");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 14, , 15]);
                    fileToBase64 = function (file) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log("[Docs] fileToBase64 called for:", file.name, "size:", file.size);
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    var reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = function () {
                                        var result = reader.result;
                                        console.log("[Docs] FileReader result length:", result.length);
                                        var base64 = result.split(',')[1];
                                        console.log("[Docs] Base64 length after split:", (base64 === null || base64 === void 0 ? void 0 : base64.length) || 0);
                                        if (!base64) {
                                            reject(new Error("Failed to extract base64 from file"));
                                            return;
                                        }
                                        resolve(base64);
                                    };
                                    reader.onerror = function (error) {
                                        console.error("[Docs] FileReader error:", error);
                                        reject(error);
                                    };
                                })];
                        });
                    }); };
                    bankStatementsBase64 = void 0;
                    bankStatementsFilename = void 0;
                    otherDocumentsBase64 = void 0;
                    otherDocumentsFilename = void 0;
                    if (!formData.bankStatements) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    console.log("[Docs] Converting bank statements to base64...");
                    console.log("[Docs] Bank statements file:", formData.bankStatements.name, formData.bankStatements.size, "bytes");
                    return [4 /*yield*/, fileToBase64(formData.bankStatements)];
                case 3:
                    bankStatementsBase64 = _a.sent();
                    bankStatementsFilename = formData.bankStatements.name;
                    console.log("[Docs] ✅ Bank statements converted! Base64 length:", bankStatementsBase64.length);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    msg = error_3 instanceof Error ? error_3.message : String(error_3);
                    console.error("[Docs] ❌ Failed to read bank statements file:", msg);
                    setUploadError("Failed to read Bank Statements file: ".concat(msg, ". Please try uploading again."));
                    setIsUploadingDocs(false);
                    return [2 /*return*/];
                case 5:
                    if (!formData.otherDocuments) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    console.log("[Docs] Converting other documents to base64...");
                    console.log("[Docs] Other documents file:", formData.otherDocuments.name, formData.otherDocuments.size, "bytes");
                    return [4 /*yield*/, fileToBase64(formData.otherDocuments)];
                case 7:
                    otherDocumentsBase64 = _a.sent();
                    otherDocumentsFilename = formData.otherDocuments.name;
                    console.log("[Docs] ✅ Other documents converted! Base64 length:", otherDocumentsBase64.length);
                    return [3 /*break*/, 9];
                case 8:
                    error_4 = _a.sent();
                    msg = error_4 instanceof Error ? error_4.message : String(error_4);
                    console.error("[Docs] ⚠️  Failed to read other documents file:", msg);
                    // Don't fail - continue with just bank statements
                    console.log("[Docs] Continuing upload without other documents...");
                    otherDocumentsBase64 = undefined;
                    otherDocumentsFilename = undefined;
                    return [3 /*break*/, 9];
                case 9:
                    // Upload documents to folder (use same folder as the PDF from Step 4)
                    console.log("[Docs] Uploading to Vercel Blob storage...");
                    uploadResult = void 0;
                    _a.label = 10;
                case 10:
                    _a.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, (0, upload_application_documents_1.uploadApplicationDocuments)((formData.businessName || formData.legalBusinessName || "Unknown Business"), undefined, // No PDF bytes - just uploading documents
                        bankStatementsBase64, bankStatementsFilename, otherDocumentsBase64, otherDocumentsFilename, applicationFolderPath || undefined // Pass existing folder path from Step 4
                        )];
                case 11:
                    uploadResult = _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    uploadError_5 = _a.sent();
                    msg = uploadError_5 instanceof Error ? uploadError_5.message : String(uploadError_5);
                    console.error("[Docs] ❌ Upload to Vercel Blob failed:", msg);
                    userMessage = "Failed to upload documents to storage. Please try again.";
                    if (msg.includes("network") || msg.includes("Network")) {
                        userMessage = "Network error during upload. Please check your connection and try again.";
                    }
                    else if (msg.includes("timeout") || msg.includes("Timeout")) {
                        userMessage = "Upload took too long. Please try again with smaller files.";
                    }
                    else if (msg.includes("quota") || msg.includes("space")) {
                        userMessage = "Storage quota exceeded. Please contact support at vivsin1995@gmail.com";
                    }
                    else if (msg.includes("permission") || msg.includes("forbidden")) {
                        userMessage = "Upload permission denied. This is likely a configuration issue. Please contact support.";
                    }
                    setUploadError(userMessage);
                    setIsUploadingDocs(false);
                    return [2 /*return*/];
                case 13:
                    console.log("[Docs] uploadApplicationDocuments returned:", JSON.stringify(uploadResult, null, 2));
                    if (uploadResult.success && uploadResult.folder) {
                        console.log("[Docs] ✅ Documents uploaded successfully!");
                        console.log("[Docs] Bank statements URL:", uploadResult.folder.bankStatementsUrl);
                        console.log("[Docs] Other documents URL:", uploadResult.folder.otherDocumentsUrl);
                        // Success - redirect to success page
                        setIsUploadingDocs(false);
                        // Use setTimeout to ensure proper state update before navigation
                        setTimeout(function () {
                            console.log("[Docs] Navigating to success page...");
                            router.push("/apply/success");
                        }, 100);
                    }
                    else {
                        errorMsg = uploadResult.error || "Unknown error";
                        console.error("[Docs] ❌ Document upload failed:", errorMsg);
                        userMessage = "Document upload failed";
                        if (errorMsg.includes("folder")) {
                            userMessage = "Application folder not found. Please go back and sign your application in Step 4.";
                        }
                        else if (errorMsg.includes("environment")) {
                            userMessage = "Storage service not properly configured. Please contact support at vivsin1995@gmail.com";
                        }
                        else if (errorMsg.includes("email")) {
                            userMessage = "Documents uploaded successfully, but confirmation email failed. Your application is submitted - no action needed.";
                        }
                        setUploadError(userMessage);
                        setIsUploadingDocs(false);
                    }
                    return [3 /*break*/, 15];
                case 14:
                    error_5 = _a.sent();
                    console.error("[Docs] ❌ Unexpected error in handleDocumentUpload:");
                    console.error("[Docs] Error type:", error_5 === null || error_5 === void 0 ? void 0 : error_5.constructor.name);
                    console.error("[Docs] Error message:", error_5 instanceof Error ? error_5.message : String(error_5));
                    console.error("[Docs] Error stack:", error_5 instanceof Error ? error_5.stack : "N/A");
                    userMessage = "Unexpected error during upload";
                    if (error_5 instanceof Error) {
                        if (error_5.message.includes("localStorage")) {
                            userMessage = "Browser storage error. Please clear browser cache and try again.";
                        }
                        else if (error_5.message.includes("abort")) {
                            userMessage = "Upload was cancelled. Please try again.";
                        }
                        else if (error_5.message.includes("network")) {
                            userMessage = "Network error. Please check your internet connection and try again.";
                        }
                        else {
                            userMessage = "Upload error: ".concat(error_5.message);
                        }
                    }
                    setUploadError(userMessage);
                    setIsUploadingDocs(false);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    }); };
    var getFundingAmountValue = function (range) {
        var values = {
            less_than_50k: 25000,
            "50k_to_100k": 75000,
            "100k_to_250k": 175000,
            "250k_to_500k": 375000,
            "500k_to_1m": 750000,
            more_than_1m: 1500000,
        };
        return values[range] || 0;
    };
    var handleDownloadPDF = function () { return __awaiter(_this, void 0, void 0, function () {
        var timeoutPromise, pdfPromise, result, pdfData, blob, url_1, link_2, businessName, errorMsg, errorMsg, errorMsg, userMessage, error_6, errorMessage, userMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsDownloadingPDF(true);
                    setPdfDownloadError(null);
                    console.log("[PDF Download] Starting PDF download...");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    timeoutPromise = new Promise(function (_, reject) {
                        setTimeout(function () { return reject(new Error("PDF generation timeout")); }, 30000); // 30 second timeout
                    });
                    pdfPromise = (0, download_application_pdf_1.downloadApplicationPDF)(formData);
                    console.log("[PDF Download] Waiting for PDF generation (30s timeout)...");
                    return [4 /*yield*/, Promise.race([pdfPromise, timeoutPromise])];
                case 2:
                    result = _a.sent();
                    if (result.success && result.pdfBytes) {
                        try {
                            pdfData = new Uint8Array(result.pdfBytes);
                            // Validate PDF bytes
                            if (pdfData.length === 0) {
                                throw new Error("PDF generation returned empty data");
                            }
                            console.log("[PDF Download] PDF generated successfully, size:", pdfData.length, "bytes");
                            blob = new Blob([pdfData.buffer], { type: "application/pdf" });
                            if (blob.size === 0) {
                                throw new Error("Failed to create PDF blob - blob is empty");
                            }
                            console.log("[PDF Download] Blob created successfully, size:", blob.size, "bytes");
                            // Create a download link
                            try {
                                url_1 = window.URL.createObjectURL(blob);
                                if (!url_1) {
                                    throw new Error("Failed to create object URL for blob");
                                }
                                link_2 = document.createElement("a");
                                link_2.href = url_1;
                                businessName = (formData.businessName || formData.legalBusinessName || "Application").replace(/\s+/g, "_");
                                link_2.download = "TurboFunding_Application_".concat(businessName, "_").concat(new Date().toISOString().split("T")[0], ".pdf");
                                document.body.appendChild(link_2);
                                console.log("[PDF Download] Triggering download...");
                                link_2.click();
                                // Cleanup
                                setTimeout(function () {
                                    document.body.removeChild(link_2);
                                    window.URL.revokeObjectURL(url_1);
                                }, 100);
                                console.log("[PDF Download] ✅ PDF downloaded successfully");
                            }
                            catch (blobError) {
                                errorMsg = blobError instanceof Error ? blobError.message : String(blobError);
                                console.error("[PDF Download] Blob file error:", errorMsg);
                                throw new Error("Uploaded PDF no longer accessible: ".concat(errorMsg));
                            }
                        }
                        catch (processingError) {
                            errorMsg = processingError instanceof Error ? processingError.message : String(processingError);
                            console.error("[PDF Download] PDF processing error:", errorMsg);
                            setPdfDownloadError(errorMsg);
                            setIsDownloadingPDF(false);
                            return [2 /*return*/];
                        }
                    }
                    else {
                        errorMsg = result.error || "Unknown error during PDF generation";
                        console.error("[PDF Download] PDF generation failed:", errorMsg);
                        userMessage = errorMsg;
                        if (errorMsg.includes("Buffer") || errorMsg.includes("buffer")) {
                            userMessage = "Failed to generate PDF: Buffer error. Please try again.";
                        }
                        else if (errorMsg.includes("font")) {
                            userMessage = "Failed to generate PDF: Font error. Retrying with fallback...";
                        }
                        else if (errorMsg.includes("image")) {
                            userMessage = "Failed to generate PDF: Image error. Please try again.";
                        }
                        setPdfDownloadError(userMessage);
                        setIsDownloadingPDF(false);
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_6 = _a.sent();
                    errorMessage = error_6 instanceof Error ? error_6.message : String(error_6);
                    console.error("[PDF Download] ❌ Error during PDF download:");
                    console.error("[PDF Download] Error type:", error_6.constructor.name);
                    console.error("[PDF Download] Error message:", errorMessage);
                    userMessage = errorMessage;
                    if (errorMessage.includes("timeout")) {
                        userMessage = "Network timeout - PDF generation is taking too long. Please try again.";
                    }
                    else if (errorMessage.includes("blob") || errorMessage.includes("Blob")) {
                        userMessage = "Blob file not found - Uploaded PDF no longer accessible. Please try downloading again.";
                    }
                    else if (errorMessage.includes("URL")) {
                        userMessage = "Failed to create download link. Please try again.";
                    }
                    else if (errorMessage.includes("network") || errorMessage.includes("Network")) {
                        userMessage = "Network connection error. Please check your internet and try again.";
                    }
                    setPdfDownloadError(userMessage);
                    return [3 /*break*/, 5];
                case 4:
                    setIsDownloadingPDF(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement(conversion_tracking_1.ConversionTracking, { eventName: "ViewContent", eventData: { content_type: "application_page" } }),
        showDraftModal && (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" },
            React.createElement("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200" },
                React.createElement("button", { onClick: startFresh, className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600", "aria-label": "Close" },
                    React.createElement(lucide_react_1.XIcon, { className: "h-5 w-5" })),
                React.createElement("div", { className: "flex items-center gap-3 mb-4" },
                    React.createElement(image_1.default, { src: "/images/tf-logo.png", alt: "TurboFunding Logo", width: 62, height: 62, className: "w-18 h-18" }),
                    React.createElement("h2", { className: "text-xl font-bold text-gray-900" }, "Welcome Back!")),
                React.createElement("p", { className: "text-gray-600 mb-6" },
                    "We found a ",
                    React.createElement("b", null, "saved draft"),
                    " of your funding application. Would you like to continue where you left off or start a new application?"),
                React.createElement("div", { className: "flex flex-col sm:flex-row gap-3" },
                    React.createElement(button_1.Button, { onClick: restoreDraft, className: "flex-1 bg-orange-500 hover:bg-orange-600 text-white" }, "Continue Application"),
                    React.createElement(button_1.Button, { onClick: startFresh, variant: "outline", className: "flex-1 border-gray-300 text-gray-700 hover:bg-gray-100" }, "Start Fresh"))))),
        React.createElement(signature_modal_1.SignatureModal, { isOpen: showSignatureModal, onClose: handleSignatureModalClose, onSign: handleInlineSignature, signerName: currentSignerIndex === 0
                ? "".concat(formData.firstName, " ").concat(formData.lastName).trim() || "Primary Owner"
                : "".concat(formData.secondOwnerFirstName, " ").concat(formData.secondOwnerLastName).trim() || "Second Owner", signerNumber: currentSignerIndex + 1, totalSigners: showSecondOwner && formData.secondOwnerFirstName && formData.secondOwnerLastName ? 2 : 1 }),
        React.createElement("div", { className: "flex min-h-screen flex-col bg-[#F5F7FA]" },
            React.createElement("main", { className: "flex-1" },
                React.createElement("section", { className: "w-full py-8 md:py-16 bg-[#F5F7FA]" },
                    React.createElement("div", { className: "container px-4 md:px-6" },
                        React.createElement("div", { className: "mx-auto max-w-3xl" },
                            lastSaved && step < 5 && (React.createElement("div", { className: "mb-4 flex items-center justify-end gap-2" },
                                React.createElement("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
                                React.createElement("span", { className: "text-xs text-gray-500" },
                                    "Draft auto-saved at ",
                                    lastSaved.toLocaleString(),
                                    formData.businessName && " \u2022 ".concat(formData.businessName),
                                    (formData.bankStatements || formData.otherDocuments) && " \u2022 ".concat((formData.bankStatements ? 1 : 0) + (formData.otherDocuments ? 1 : 0), " files"),
                                    formData.signatureImage && " \u2022 signature"))),
                            React.createElement("div", { className: "mb-6" },
                                React.createElement("div", { className: "md:hidden" },
                                    React.createElement("div", { className: "relative mb-4" },
                                        React.createElement("div", { className: "h-2 bg-gray-200 rounded-full overflow-hidden relative" },
                                            React.createElement("div", { className: "absolute inset-0 flex justify-between px-1 items-center" }, [1, 2, 3, 4, 5, 6, 7].map(function (s) { return (React.createElement("div", { key: s, className: "w-1.5 h-1.5 rounded-full transition-all duration-300 ".concat(s <= step ? "bg-white/80" : "bg-gray-400/50") })); })),
                                            React.createElement("div", { className: "h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 ease-out", style: { width: "".concat(Math.max(8, ((step) / 7) * 100), "%") } }))),
                                    React.createElement("div", { className: "flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100" },
                                        React.createElement("div", { className: "flex items-center gap-3" },
                                            React.createElement("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg" }, step > 7 ? React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5" }) : step),
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-sm font-semibold text-gray-900 font-space-grotesk" },
                                                    step === 1 && "Starting Info",
                                                    step === 2 && "Funding Info",
                                                    step === 3 && "Business Info",
                                                    step === 4 && "Owner Info",
                                                    step === 5 && "Signature",
                                                    step === 6 && "Confirmation",
                                                    step === 7 && "Documents"),
                                                React.createElement("p", { className: "text-xs text-gray-500 font-space-grotesk" },
                                                    "Step ",
                                                    step,
                                                    " of 7"))),
                                        React.createElement("div", { className: "flex gap-1.5" }, [1, 2, 3, 4, 5, 6, 7].map(function (s) { return (React.createElement("div", { key: s, className: "w-2 h-2 rounded-full transition-all duration-300 ".concat(s < step
                                                ? "bg-orange-500"
                                                : s === step
                                                    ? "bg-orange-500 scale-125"
                                                    : "bg-gray-300") })); })))),
                                React.createElement("div", { className: "hidden md:block" },
                                    React.createElement("div", { className: "relative mb-8" },
                                        React.createElement("div", { className: "absolute top-6 left-0 right-0 h-1.5 bg-gray-200 rounded-full" }),
                                        React.createElement("div", { className: "absolute top-6 left-0 h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all duration-500 ease-out", style: { width: "".concat(((step - 1) / 6) * 100, "%") } }),
                                        React.createElement("div", { className: "relative flex justify-between" }, [
                                            { num: 1, label: "Starting Info" },
                                            { num: 2, label: "Funding Info" },
                                            { num: 3, label: "Business Info" },
                                            { num: 4, label: "Owner Info" },
                                            { num: 5, label: "Signature" },
                                            { num: 6, label: "Confirmation" },
                                            { num: 7, label: "Documents" },
                                        ].map(function (_a) {
                                            var num = _a.num, label = _a.label;
                                            return (React.createElement("div", { key: num, className: "flex flex-col items-center transition-opacity ".concat(num <= step ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed"), onClick: function () { return num <= step && setStep(num); } },
                                                React.createElement("div", { className: "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ".concat(step > num
                                                        ? "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-500/30"
                                                        : step === num
                                                            ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-xl shadow-orange-500/40 scale-110 ring-4 ring-orange-100"
                                                            : "bg-white border-2 border-gray-300 text-gray-400") }, step > num ? React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-6 w-6" }) : num),
                                                React.createElement("p", { className: "mt-3 text-sm font-medium transition-colors duration-300 font-space-grotesk ".concat(step >= num ? "text-gray-900" : "text-gray-400") }, label)));
                                        }))))),
                            step === 1 && (React.createElement(React.Fragment, null,
                                React.createElement(conversion_tracking_1.ConversionTracking, { eventName: "ViewContent", eventData: { content_type: "application_step_starting" } }),
                                React.createElement(card_1.Card, { className: "bg-white border-gray-200" },
                                    React.createElement(card_1.CardHeader, null,
                                        React.createElement(card_1.CardTitle, { className: "text-2xl text-gray-900" }, "Starting Information"),
                                        React.createElement(card_1.CardDescription, { className: "text-gray-600" }, "Let's start with some basic information about you and your business.")),
                                    React.createElement(card_1.CardContent, { className: "pt-6" },
                                        React.createElement("form", { className: "space-y-6" },
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "startingBusinessName", className: "text-gray-800" },
                                                    "Business Name ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "startingBusinessName", placeholder: "ABC Company LLC", value: formData.startingBusinessName, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { startingBusinessName: e.target.value }));
                                                        if (errors.startingBusinessName) {
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { startingBusinessName: "" })); });
                                                        }
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.startingBusinessName ? "border-red-500" : ""), required: true }),
                                                errors.startingBusinessName && (React.createElement("p", { className: "text-red-500 text-sm" }, errors.startingBusinessName))),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "startingOwnerName", className: "text-gray-800" },
                                                    "Owner Name ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "startingOwnerName", placeholder: "John Doe", value: formData.startingOwnerName, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { startingOwnerName: e.target.value }));
                                                        if (errors.startingOwnerName) {
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { startingOwnerName: "" })); });
                                                        }
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.startingOwnerName ? "border-red-500" : ""), required: true }),
                                                errors.startingOwnerName && (React.createElement("p", { className: "text-red-500 text-sm" }, errors.startingOwnerName))),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "startingPhone", className: "text-gray-800" },
                                                    "Preferred Phone Number ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "startingPhone", placeholder: "(555) 123-4567", type: "tel", value: formData.startingPhone, onChange: function (e) {
                                                        var formatted = formatPhone(e.target.value);
                                                        setFormData(__assign(__assign({}, formData), { startingPhone: formatted }));
                                                        if (errors.startingPhone) {
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { startingPhone: "" })); });
                                                        }
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.startingPhone ? "border-red-500" : ""), required: true }),
                                                errors.startingPhone && (React.createElement("p", { className: "text-red-500 text-sm" }, errors.startingPhone))),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "startingEmail", className: "text-gray-800" },
                                                    "Preferred Email ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "startingEmail", placeholder: "john@example.com", type: "email", value: formData.startingEmail, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { startingEmail: e.target.value }));
                                                        if (errors.startingEmail) {
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { startingEmail: "" })); });
                                                        }
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.startingEmail ? "border-red-500" : ""), required: true }),
                                                errors.startingEmail && (React.createElement("p", { className: "text-red-500 text-sm" }, errors.startingEmail))))),
                                    React.createElement(card_1.CardFooter, { className: "flex justify-between pt-6 border-t border-gray-200" },
                                        React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return (window.location.href = "/"); }, className: "font-semibold" }, "Cancel"),
                                        React.createElement(button_1.Button, { type: "button", onClick: nextStep, className: "bg-orange-500 hover:bg-orange-600 text-white" }, "Next Step"))))),
                            step === 2 && (React.createElement(React.Fragment, null,
                                React.createElement(conversion_tracking_1.ConversionTracking, { eventName: "AddPaymentInfo", eventData: { content_type: "application_step_2" } }),
                                React.createElement(card_1.Card, { className: "bg-white border-gray-200" },
                                    React.createElement(card_1.CardContent, { className: "pt-6" },
                                        React.createElement("p", { className: "text-gray-600 mb-6" }, "Tell us about your funding needs."),
                                        React.createElement("form", { className: "space-y-6" },
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "amountRequested", className: "text-gray-800" },
                                                    "Amount Requested ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement("p", { className: "text-sm text-gray-500" },
                                                    "Minimum: $",
                                                    MIN_FUNDING_AMOUNT.toLocaleString()),
                                                React.createElement(input_1.Input, { id: "amountRequested", name: "amountRequested", type: "number", value: formData.amountRequested, onChange: function (e) {
                                                        handleChange(e);
                                                        if (errors.amountRequested) {
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { amountRequested: "" })); });
                                                        }
                                                    }, placeholder: "Enter amount", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.amountRequested ? "border-red-500 focus:ring-red-500" : ""), required: true }),
                                                errors.amountRequested && (React.createElement("p", { className: "text-red-500 text-sm" }, errors.amountRequested))),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "useOfFunds", className: "text-gray-800" },
                                                    "Use of Funds ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(textarea_1.Textarea, { id: "useOfFunds", placeholder: "Describe how you plan to use the funding...", value: formData.useOfFunds, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { useOfFunds: e.target.value }));
                                                        if (errors.useOfFunds) {
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { useOfFunds: "" })); });
                                                        }
                                                    }, className: "bg-white border-gray-300 text-gray-900 min-h-[100px] ".concat(errors.useOfFunds ? "border-red-500 focus:ring-red-500" : ""), required: true }),
                                                errors.useOfFunds && (React.createElement("p", { className: "text-red-500 text-sm" }, errors.useOfFunds))))),
                                    React.createElement(card_1.CardFooter, { className: "flex justify-between pt-6 border-t border-gray-200" },
                                        React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: function () { return (window.location.href = "/"); }, className: "font-semibold" }, "Cancel"),
                                        React.createElement(button_1.Button, { type: "button", onClick: nextStep, className: "bg-orange-500 hover:bg-orange-600 text-white" }, "Next Step"))))),
                            step === 3 && (React.createElement(React.Fragment, null,
                                React.createElement(conversion_tracking_1.ConversionTracking, { eventName: "AddPaymentInfo", eventData: { content_type: "application_step_2" } }),
                                React.createElement(card_1.Card, { className: "bg-white border-gray-200" },
                                    React.createElement(card_1.CardContent, { className: "pt-6" },
                                        React.createElement("p", { className: "text-gray-600 mb-6" }, "Tell us about your business to help us find the right funding solution."),
                                        React.createElement("form", { className: "space-y-6" },
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "businessName", className: "text-gray-800" },
                                                    "Legal Business Name ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "businessName", placeholder: "ABC Company LLC", value: formData.businessName, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { businessName: e.target.value }));
                                                        if (errors.businessName)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { businessName: "" })); });
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.businessName ? "border-red-500" : ""), required: true }),
                                                errors.businessName && React.createElement("p", { className: "text-red-500 text-sm" }, errors.businessName)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "dba", className: "text-gray-800" }, "DBA (\u201CDoing Business As\u201D)"),
                                                React.createElement(input_1.Input, { id: "dba", placeholder: "Doing Business As", value: formData.dba, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { dba: e.target.value }));
                                                        if (errors.dba)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { dba: "" })); });
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.dba ? "border-red-500" : "") }),
                                                errors.dba && React.createElement("p", { className: "text-red-500 text-sm" }, errors.dba)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "federalTaxId", className: "text-gray-800" },
                                                    "Federal Tax ID (EIN) ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "federalTaxId", placeholder: "XX-XXXXXXX", value: formData.federalTaxId, maxLength: 10, onChange: function (e) {
                                                        var formatted = formatEIN(e.target.value);
                                                        setFormData(__assign(__assign({}, formData), { federalTaxId: formatted }));
                                                        if (errors.federalTaxId)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { federalTaxId: "" })); });
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.federalTaxId ? "border-red-500" : ""), required: true }),
                                                errors.federalTaxId && React.createElement("p", { className: "text-red-500 text-sm" }, errors.federalTaxId)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "businessAddress", className: "text-gray-800" },
                                                    "Business Address ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { ref: addressInputRef, id: "businessAddress", placeholder: "123 Main St", value: formData.businessAddress, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { businessAddress: e.target.value }));
                                                        if (errors.businessAddress)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { businessAddress: "" })); });
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.businessAddress ? "border-red-500" : ""), required: true, autoComplete: "off" }),
                                                errors.businessAddress && React.createElement("p", { className: "text-red-500 text-sm" }, errors.businessAddress),
                                                React.createElement("p", { className: "text-xs text-gray-500" }, "Start typing to see address suggestions")),
                                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3" },
                                                React.createElement("div", { className: "space-y-3" },
                                                    React.createElement(label_1.Label, { htmlFor: "city", className: "text-gray-800" },
                                                        "City ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(input_1.Input, { id: "businessCity", placeholder: "Enter city", value: formData.businessCity, onChange: function (e) {
                                                            setFormData(__assign(__assign({}, formData), { businessCity: e.target.value }));
                                                            if (errors.businessCity)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { businessCity: "" })); });
                                                        }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.businessCity ? "border-red-500" : ""), required: true }),
                                                    errors.businessCity && React.createElement("p", { className: "text-red-500 text-sm" }, errors.businessCity)),
                                                React.createElement("div", { className: "space-y-3" },
                                                    React.createElement(label_1.Label, { htmlFor: "state", className: "text-gray-800" },
                                                        "State ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(select_1.Select, { value: formData.businessState, onValueChange: function (value) {
                                                            setFormData(__assign(__assign({}, formData), { businessState: value }));
                                                            if (errors.businessState)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { businessState: "" })); });
                                                        }, required: true },
                                                        React.createElement(select_1.SelectTrigger, { className: "bg-white border-gray-300 text-gray-900 ".concat(errors.businessState ? "border-red-500" : "") },
                                                            React.createElement(select_1.SelectValue, { placeholder: "Select state" })),
                                                        React.createElement(select_1.SelectContent, { className: "bg-white border-gray-300 text-gray-900 max-h-[300px]" }, US_STATES.map(function (state) { return (React.createElement(select_1.SelectItem, { key: state, value: state }, state)); }))),
                                                    errors.businessState && React.createElement("p", { className: "text-red-500 text-sm" }, errors.businessState)),
                                                React.createElement("div", { className: "space-y-3" },
                                                    React.createElement(label_1.Label, { htmlFor: "zipCode", className: "text-gray-800" },
                                                        "Zip Code ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(input_1.Input, { id: "businessZip", placeholder: "XXXXX", value: formData.businessZip, maxLength: 10, onChange: function (e) {
                                                            var formatted = formatZipCode(e.target.value);
                                                            setFormData(__assign(__assign({}, formData), { businessZip: formatted }));
                                                            if (errors.businessZip)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { businessZip: "" })); });
                                                        }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.businessZip ? "border-red-500" : ""), required: true }),
                                                    errors.businessZip && React.createElement("p", { className: "text-red-500 text-sm" }, errors.businessZip))),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "businessPhone", className: "text-gray-800" },
                                                    "Business Phone ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "businessPhone", type: "tel", placeholder: "(XXX) XXX-XXXX", value: formData.businessPhone, maxLength: 14, onChange: function (e) {
                                                        var formatted = formatPhone(e.target.value);
                                                        setFormData(__assign(__assign({}, formData), { businessPhone: formatted }));
                                                        if (errors.businessPhone)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { businessPhone: "" })); });
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.businessPhone ? "border-red-500" : ""), required: true }),
                                                errors.businessPhone && React.createElement("p", { className: "text-red-500 text-sm" }, errors.businessPhone)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "businessEmail", className: "text-gray-800" },
                                                    "Business Email ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "businessEmail", type: "email", placeholder: "contact@business.com", value: formData.businessEmail, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { businessEmail: e.target.value }));
                                                        if (errors.businessEmail)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { businessEmail: "" })); });
                                                    }, className: "bg-[#F5F7FA] border-gray-300 text-gray-900 ".concat(errors.businessEmail ? "border-red-500" : ""), required: true }),
                                                errors.businessEmail && React.createElement("p", { className: "text-red-500 text-sm" }, errors.businessEmail)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "industry", className: "text-gray-800" },
                                                    "Industry ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(select_1.Select, { value: formData.industry, onValueChange: function (value) {
                                                        setFormData(__assign(__assign({}, formData), { industry: value }));
                                                        if (errors.industry)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { industry: "" })); });
                                                    }, required: true },
                                                    React.createElement(select_1.SelectTrigger, { className: "bg-white border-gray-300 text-gray-900 ".concat(errors.industry ? "border-red-500" : "") },
                                                        React.createElement(select_1.SelectValue, { placeholder: "Select industry" })),
                                                    React.createElement(select_1.SelectContent, { className: "bg-white border-gray-300 text-gray-900 max-h-[300px]" },
                                                        React.createElement(select_1.SelectItem, { value: "Retail" }, "Retail"),
                                                        React.createElement(select_1.SelectItem, { value: "Healthcare" }, "Healthcare"),
                                                        React.createElement(select_1.SelectItem, { value: "Technology" }, "Technology"),
                                                        React.createElement(select_1.SelectItem, { value: "Hospitality" }, "Hospitality"),
                                                        React.createElement(select_1.SelectItem, { value: "Construction" }, "Construction"),
                                                        React.createElement(select_1.SelectItem, { value: "Manufacturing" }, "Manufacturing"),
                                                        React.createElement(select_1.SelectItem, { value: "Other" }, "Other"))),
                                                errors.industry && React.createElement("p", { className: "text-red-500 text-sm" }, errors.industry)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "businessStartDate", className: "text-gray-800" },
                                                    "Business Start Date ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "businessStartDate", type: "date", value: formData.businessStartDate, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { businessStartDate: e.target.value }));
                                                        if (errors.businessStartDate)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { businessStartDate: "" })); });
                                                    }, className: "bg-[#F5F7FA] border-gray-300 text-gray-900 ".concat(errors.businessStartDate ? "border-red-500" : ""), required: true }),
                                                errors.businessStartDate && React.createElement("p", { className: "text-red-500 text-sm" }, errors.businessStartDate)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "entityType", className: "text-gray-800" },
                                                    "Entity Type ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(select_1.Select, { value: formData.entityType, onValueChange: function (value) {
                                                        setFormData(__assign(__assign({}, formData), { entityType: value }));
                                                        if (errors.entityType)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { entityType: "" })); });
                                                    } },
                                                    React.createElement(select_1.SelectTrigger, { className: "bg-white border-gray-300 text-gray-900 ".concat(errors.entityType ? "border-red-500" : "") },
                                                        React.createElement(select_1.SelectValue, { placeholder: "Select entity type" })),
                                                    React.createElement(select_1.SelectContent, { className: "bg-white border-gray-300 text-gray-900" },
                                                        React.createElement(select_1.SelectItem, { value: "LLC" }, "LLC"),
                                                        React.createElement(select_1.SelectItem, { value: "Corporation" }, "Corporation"),
                                                        React.createElement(select_1.SelectItem, { value: "Partnership" }, "Partnership"),
                                                        React.createElement(select_1.SelectItem, { value: "Sole Proprietorship" }, "Sole Proprietorship"))),
                                                errors.entityType && React.createElement("p", { className: "text-red-500 text-sm" }, errors.entityType)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "yearsInBusiness", className: "text-gray-800" },
                                                    "Years in Business ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "yearsInBusiness", type: "number", placeholder: "Enter years in business", value: formData.yearsInBusiness, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { yearsInBusiness: e.target.value }));
                                                        if (errors.yearsInBusiness)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { yearsInBusiness: "" })); });
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.yearsInBusiness ? "border-red-500" : ""), required: true }),
                                                errors.yearsInBusiness && React.createElement("p", { className: "text-red-500 text-sm" }, errors.yearsInBusiness)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "annualRevenue", className: "text-gray-800" },
                                                    "Annual Revenue ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(select_1.Select, { value: formData.annualRevenue, onValueChange: function (value) {
                                                        setFormData(__assign(__assign({}, formData), { annualRevenue: value }));
                                                        if (errors.annualRevenue)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { annualRevenue: "" })); });
                                                    }, required: true },
                                                    React.createElement(select_1.SelectTrigger, { className: "bg-white border-gray-300 text-gray-900 ".concat(errors.annualRevenue ? "border-red-500" : "") },
                                                        React.createElement(select_1.SelectValue, { placeholder: "Select revenue range" })),
                                                    React.createElement(select_1.SelectContent, { className: "bg-white border-gray-300 text-gray-900 max-h-[300px]" },
                                                        React.createElement(select_1.SelectItem, { value: "10000-50000" }, "$10,000 - $50,000"),
                                                        React.createElement(select_1.SelectItem, { value: "50001-100000" }, "$50,001 - $100,000"),
                                                        React.createElement(select_1.SelectItem, { value: "100001-250000" }, "$100,001 - $250,000"),
                                                        React.createElement(select_1.SelectItem, { value: "250001-500000" }, "$250,001 - $500,000"),
                                                        React.createElement(select_1.SelectItem, { value: "500001-1000000" }, "$500,001 - $1,000,000"),
                                                        React.createElement(select_1.SelectItem, { value: "1000001+" }, "Over $1,000,000"))),
                                                errors.annualRevenue && React.createElement("p", { className: "text-red-500 text-sm" }, errors.annualRevenue)),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(label_1.Label, { htmlFor: "email", className: "text-gray-800" },
                                                    "Email Address ",
                                                    React.createElement("span", { className: "text-red-500" }, "*")),
                                                React.createElement(input_1.Input, { id: "email", type: "email", placeholder: "Enter your email", value: formData.email, onChange: function (e) {
                                                        setFormData(__assign(__assign({}, formData), { email: e.target.value }));
                                                        if (errors.email)
                                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { email: "" })); });
                                                    }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.email ? "border-red-500" : ""), required: true }),
                                                errors.email && React.createElement("p", { className: "text-red-500 text-sm" }, errors.email)))),
                                    React.createElement(card_1.CardFooter, { className: "flex justify-between pt-6 border-t border-gray-200" },
                                        React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: prevStep, className: "font-semibold bg-transparent" }, "Previous"),
                                        React.createElement(button_1.Button, { type: "button", onClick: nextStep, className: "bg-orange-500 hover:bg-orange-600 text-white" }, "Next Step"))))),
                            step === 4 && (React.createElement(React.Fragment, null,
                                React.createElement(conversion_tracking_1.ConversionTracking, { eventName: "AddPaymentInfo", eventData: { content_type: "application_step_3" } }),
                                React.createElement(card_1.Card, { className: "bg-white border-gray-200" },
                                    React.createElement(card_1.CardContent, { className: "pt-6" },
                                        React.createElement("p", { className: "text-gray-600 mb-6" }, "Please provide owner information."),
                                        React.createElement("form", { className: "space-y-6" },
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement("h3", { className: "text-lg font-medium text-orange-400" }, "Primary Owner Information"),
                                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" },
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "firstName" },
                                                            "First Name ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "firstName", name: "firstName", value: formData.firstName, onChange: function (e) {
                                                                handleChange(e);
                                                                if (errors.firstName)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { firstName: "" })); });
                                                            }, placeholder: "Enter your first name", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.firstName ? "border-red-500" : ""), required: true }),
                                                        errors.firstName && React.createElement("p", { className: "text-red-500 text-sm" }, errors.firstName)),
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "lastName" },
                                                            "Last Name ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "lastName", name: "lastName", value: formData.lastName, onChange: function (e) {
                                                                handleChange(e);
                                                                if (errors.lastName)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { lastName: "" })); });
                                                            }, placeholder: "Enter your last name", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.lastName ? "border-red-500" : ""), required: true }),
                                                        errors.lastName && React.createElement("p", { className: "text-red-500 text-sm" }, errors.lastName))),
                                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" },
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "phone" },
                                                            "Phone ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "phone", name: "phone", type: "tel", value: formData.phone, maxLength: 14, onChange: function (e) {
                                                                var formatted = formatPhone(e.target.value);
                                                                setFormData(__assign(__assign({}, formData), { phone: formatted }));
                                                                if (errors.phone)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { phone: "" })); });
                                                            }, placeholder: "(XXX) XXX-XXXX", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.phone ? "border-red-500" : ""), required: true }),
                                                        errors.phone && React.createElement("p", { className: "text-red-500 text-sm" }, errors.phone)),
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "dateOfBirth" },
                                                            "Date of Birth ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "dateOfBirth", name: "dateOfBirth", type: "date", value: formData.dateOfBirth, onChange: function (e) {
                                                                handleChange(e);
                                                                if (errors.dateOfBirth)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { dateOfBirth: "" })); });
                                                            }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.dateOfBirth ? "border-red-500" : ""), required: true }),
                                                        errors.dateOfBirth && React.createElement("p", { className: "text-red-500 text-sm" }, errors.dateOfBirth))),
                                                React.createElement("div", { className: "space-y-2" },
                                                    React.createElement(label_1.Label, { htmlFor: "ssn" },
                                                        "Social Security Number ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(input_1.Input, { id: "ssn", name: "ssn", type: "password", value: formData.ssn, maxLength: 11, onChange: function (e) {
                                                            var formatted = formatSSN(e.target.value);
                                                            setFormData(__assign(__assign({}, formData), { ssn: formatted }));
                                                            if (errors.ssn)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { ssn: "" })); });
                                                        }, placeholder: "XXX-XX-XXXX", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.ssn ? "border-red-500" : ""), required: true }),
                                                    errors.ssn && React.createElement("p", { className: "text-red-500 text-sm" }, errors.ssn)),
                                                React.createElement("div", { className: "space-y-2" },
                                                    React.createElement(label_1.Label, { htmlFor: "homeAddress" },
                                                        "Home Street Address ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(input_1.Input, { ref: homeAddressInputRef, id: "homeAddress", name: "homeAddress", value: formData.homeAddress, onChange: function (e) {
                                                            handleChange(e);
                                                            if (errors.homeAddress)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { homeAddress: "" })); });
                                                        }, placeholder: "Enter your home address", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.homeAddress ? "border-red-500" : ""), required: true, autoComplete: "off" }),
                                                    errors.homeAddress && React.createElement("p", { className: "text-red-500 text-sm" }, errors.homeAddress),
                                                    React.createElement("p", { className: "text-xs text-gray-500" }, "Start typing to see address suggestions")),
                                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3" },
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "city" },
                                                            "City ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "city", name: "city", value: formData.city, onChange: function (e) {
                                                                handleChange(e);
                                                                if (errors.city)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { city: "" })); });
                                                            }, placeholder: "Enter city", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.city ? "border-red-500" : ""), required: true }),
                                                        errors.city && React.createElement("p", { className: "text-red-500 text-sm" }, errors.city)),
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "state" },
                                                            "State ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(select_1.Select, { value: formData.state, onValueChange: function (value) {
                                                                setFormData(__assign(__assign({}, formData), { state: value }));
                                                                if (errors.state)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { state: "" })); });
                                                            }, required: true },
                                                            React.createElement(select_1.SelectTrigger, { className: "bg-white border-gray-300 text-gray-900 ".concat(errors.state ? "border-red-500" : "") },
                                                                React.createElement(select_1.SelectValue, { placeholder: "Select state" })),
                                                            React.createElement(select_1.SelectContent, { className: "bg-white border-gray-300 text-gray-900 max-h-[300px]" }, US_STATES.map(function (state) { return (React.createElement(select_1.SelectItem, { key: state, value: state }, state)); }))),
                                                        errors.state && React.createElement("p", { className: "text-red-500 text-sm" }, errors.state)),
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "zip" },
                                                            "Zip Code ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "zip", name: "zip", value: formData.zip, maxLength: 10, onChange: function (e) {
                                                                var formatted = formatZipCode(e.target.value);
                                                                setFormData(__assign(__assign({}, formData), { zip: formatted }));
                                                                if (errors.zip)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { zip: "" })); });
                                                            }, placeholder: "XXXXX", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.zip ? "border-red-500" : ""), required: true }),
                                                        errors.zip && React.createElement("p", { className: "text-red-500 text-sm" }, errors.zip))),
                                                React.createElement("div", { className: "space-y-2" },
                                                    React.createElement(label_1.Label, null,
                                                        "Credit Score Range ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(radio_group_1.RadioGroup, { value: formData.creditScore, onValueChange: function (value) {
                                                            handleSelectChange("creditScore", value);
                                                            if (errors.creditScore)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { creditScore: "" })); });
                                                        }, className: "grid grid-cols-1 md:grid-cols-3 gap-2 ".concat(errors.creditScore ? "border border-red-500 rounded-md p-2" : "") },
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "excellent", id: "excellent", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "excellent", className: "cursor-pointer text-base" }, "Excellent (720+)")),
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "good", id: "good", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "good", className: "cursor-pointer text-base" }, "Good (680-719)")),
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "fair", id: "fair", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "fair", className: "cursor-pointer text-base" }, "Fair (640-679)")),
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "poor", id: "poor", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "poor", className: "cursor-pointer text-base" }, "Poor (580-639)")),
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "bad", id: "bad", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "bad", className: "cursor-pointer text-base" }, "Bad (below 580)"))),
                                                    errors.creditScore && React.createElement("p", { className: "text-red-500 text-sm" }, errors.creditScore)),
                                                React.createElement("div", { className: "space-y-2" },
                                                    React.createElement(label_1.Label, { htmlFor: "ownershipPercentage" },
                                                        "Ownership Percentage ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(input_1.Input, { id: "ownershipPercentage", name: "ownershipPercentage", type: "number", min: "1", max: "100", value: formData.ownershipPercentage, onChange: function (e) {
                                                            handleChange(e);
                                                            if (errors.ownershipPercentage)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { ownershipPercentage: "" })); });
                                                        }, placeholder: "Enter percentage (1-100)", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.ownershipPercentage ? "border-red-500" : ""), required: true }),
                                                    errors.ownershipPercentage && React.createElement("p", { className: "text-red-500 text-sm" }, errors.ownershipPercentage))),
                                            !showSecondOwner && (React.createElement("div", { className: "pt-4" },
                                                React.createElement(button_1.Button, { type: "button", className: "w-full bg-blue-600 text-white hover:bg-blue-700", onClick: function () {
                                                        setShowSecondOwner(true);
                                                        // Pre-fill second owner fields in dev mode
                                                        if (DEV_MODE) {
                                                            setFormData(function (prev) { return (__assign(__assign({}, prev), { secondOwnerFirstName: devFormData.secondOwnerFirstName, secondOwnerLastName: devFormData.secondOwnerLastName, secondOwnerPhone: devFormData.secondOwnerPhone, secondOwnerDateOfBirth: devFormData.secondOwnerDateOfBirth, secondOwnerSsn: devFormData.secondOwnerSsn, secondOwnerHomeAddress: devFormData.secondOwnerHomeAddress, secondOwnerCity: devFormData.secondOwnerCity, secondOwnerState: devFormData.secondOwnerState, secondOwnerZipCode: devFormData.secondOwnerZipCode, secondOwnerCreditScore: devFormData.secondOwnerCreditScore, secondOwnerPercentageOwnership: devFormData.secondOwnerPercentageOwnership, 
                                                                // Adjust primary owner percentage when adding second owner
                                                                percentageOwnership: "50", ownershipPercentage: "50" })); });
                                                        }
                                                    } }, "+ Add Second Owner"))),
                                            showSecondOwner && (React.createElement("div", { className: "space-y-3 pt-6 border-t border-gray-200" },
                                                React.createElement("div", { className: "flex items-center justify-between" },
                                                    React.createElement("h3", { className: "text-lg font-medium text-orange-400" }, "Second Owner Information"),
                                                    React.createElement(button_1.Button, { type: "button", variant: "ghost", size: "sm", onClick: function () { return setShowSecondOwner(false); }, className: "text-gray-400 hover:text-white" }, "Remove")),
                                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" },
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "secondOwnerFirstName" },
                                                            "First Name ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "secondOwnerFirstName", name: "secondOwnerFirstName", value: formData.secondOwnerFirstName, onChange: function (e) {
                                                                handleChange(e);
                                                                if (errors.secondOwnerFirstName)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerFirstName: "" })); });
                                                            }, placeholder: "Enter first name", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerFirstName ? "border-red-500" : "") }),
                                                        errors.secondOwnerFirstName && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerFirstName)),
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "secondOwnerLastName" },
                                                            "Last Name ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "secondOwnerLastName", name: "secondOwnerLastName", value: formData.secondOwnerLastName, onChange: function (e) {
                                                                handleChange(e);
                                                                if (errors.secondOwnerLastName)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerLastName: "" })); });
                                                            }, placeholder: "Enter last name", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerLastName ? "border-red-500" : "") }),
                                                        errors.secondOwnerLastName && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerLastName))),
                                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" },
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "secondOwnerPhone" },
                                                            "Phone ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "secondOwnerPhone", name: "secondOwnerPhone", type: "tel", value: formData.secondOwnerPhone, maxLength: 14, onChange: function (e) {
                                                                var formatted = formatPhone(e.target.value);
                                                                setFormData(__assign(__assign({}, formData), { secondOwnerPhone: formatted }));
                                                                if (errors.secondOwnerPhone)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerPhone: "" })); });
                                                            }, placeholder: "(XXX) XXX-XXXX", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerPhone ? "border-red-500" : "") }),
                                                        errors.secondOwnerPhone && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerPhone)),
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "secondOwnerDateOfBirth" },
                                                            "Date of Birth ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "secondOwnerDateOfBirth", name: "secondOwnerDateOfBirth", type: "date", value: formData.secondOwnerDateOfBirth, onChange: function (e) {
                                                                handleChange(e);
                                                                if (errors.secondOwnerDateOfBirth)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerDateOfBirth: "" })); });
                                                            }, className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerDateOfBirth ? "border-red-500" : "") }),
                                                        errors.secondOwnerDateOfBirth && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerDateOfBirth))),
                                                React.createElement("div", { className: "space-y-2" },
                                                    React.createElement(label_1.Label, { htmlFor: "secondOwnerSsn" },
                                                        "Social Security Number ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(input_1.Input, { id: "secondOwnerSsn", name: "secondOwnerSsn", type: "password", value: formData.secondOwnerSsn, maxLength: 11, onChange: function (e) {
                                                            var formatted = formatSSN(e.target.value);
                                                            setFormData(__assign(__assign({}, formData), { secondOwnerSsn: formatted }));
                                                            if (errors.secondOwnerSsn)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerSsn: "" })); });
                                                        }, placeholder: "XXX-XX-XXXX", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerSsn ? "border-red-500" : "") }),
                                                    errors.secondOwnerSsn && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerSsn)),
                                                React.createElement("div", { className: "space-y-2" },
                                                    React.createElement(label_1.Label, { htmlFor: "secondOwnerHomeAddress" },
                                                        "Home Street Address ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(input_1.Input, { ref: secondOwnerAddressInputRef, id: "secondOwnerHomeAddress", name: "secondOwnerHomeAddress", value: formData.secondOwnerHomeAddress, onChange: function (e) {
                                                            handleChange(e);
                                                            if (errors.secondOwnerHomeAddress)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerHomeAddress: "" })); });
                                                        }, placeholder: "Enter home address", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerHomeAddress ? "border-red-500" : ""), autoComplete: "off" }),
                                                    errors.secondOwnerHomeAddress && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerHomeAddress),
                                                    React.createElement("p", { className: "text-xs text-gray-500" }, "Start typing to see address suggestions")),
                                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3" },
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "secondOwnerCity" },
                                                            "City ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "secondOwnerCity", name: "secondOwnerCity", value: formData.secondOwnerCity, onChange: function (e) {
                                                                handleChange(e);
                                                                if (errors.secondOwnerCity)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerCity: "" })); });
                                                            }, placeholder: "Enter city", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerCity ? "border-red-500" : "") }),
                                                        errors.secondOwnerCity && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerCity)),
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "secondOwnerState" },
                                                            "State ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(select_1.Select, { onValueChange: function (value) {
                                                                handleSelectChange("secondOwnerState", value);
                                                                if (errors.secondOwnerState)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerState: "" })); });
                                                            }, value: formData.secondOwnerState },
                                                            React.createElement(select_1.SelectTrigger, { className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerState ? "border-red-500" : "") },
                                                                React.createElement(select_1.SelectValue, { placeholder: "Select state" })),
                                                            React.createElement(select_1.SelectContent, { className: "bg-white border-gray-300 text-gray-900 max-h-[300px]" }, US_STATES.map(function (state) { return (React.createElement(select_1.SelectItem, { key: state, value: state }, state)); }))),
                                                        errors.secondOwnerState && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerState)),
                                                    React.createElement("div", { className: "space-y-2" },
                                                        React.createElement(label_1.Label, { htmlFor: "secondOwnerZipCode" },
                                                            "Zip Code ",
                                                            React.createElement("span", { className: "text-red-500" }, "*")),
                                                        React.createElement(input_1.Input, { id: "secondOwnerZipCode", name: "secondOwnerZipCode", value: formData.secondOwnerZipCode, maxLength: 10, onChange: function (e) {
                                                                var formatted = formatZipCode(e.target.value);
                                                                setFormData(__assign(__assign({}, formData), { secondOwnerZipCode: formatted }));
                                                                if (errors.secondOwnerZipCode)
                                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerZipCode: "" })); });
                                                            }, placeholder: "XXXXX", className: "bg-white border-gray-300 text-gray-900 ".concat(errors.secondOwnerZipCode ? "border-red-500" : "") }),
                                                        errors.secondOwnerZipCode && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerZipCode))),
                                                React.createElement("div", { className: "space-y-2" },
                                                    React.createElement(label_1.Label, null,
                                                        "Credit Score Range ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(radio_group_1.RadioGroup, { value: formData.secondOwnerCreditScore, onValueChange: function (value) {
                                                            handleSelectChange("secondOwnerCreditScore", value);
                                                            if (errors.secondOwnerCreditScore)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerCreditScore: "" })); });
                                                        }, className: "grid grid-cols-1 md:grid-cols-3 gap-2 ".concat(errors.secondOwnerCreditScore ? "border border-red-500 rounded-md p-2" : "") },
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "excellent", id: "secondOwnerExcellent", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "secondOwnerExcellent", className: "cursor-pointer text-base" }, "Excellent (720+)")),
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "good", id: "secondOwnerGood", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "secondOwnerGood", className: "cursor-pointer text-base" }, "Good (680-719)")),
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "fair", id: "secondOwnerFair", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "secondOwnerFair", className: "cursor-pointer text-base" }, "Fair (640-679)")),
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "poor", id: "secondOwnerPoor", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "secondOwnerPoor", className: "cursor-pointer text-base" }, "Poor (580-639)")),
                                                        React.createElement("div", { className: "flex items-center space-x-2" },
                                                            React.createElement(radio_group_1.RadioGroupItem, { value: "bad", id: "secondOwnerBad", className: "border-orange-500 text-orange-500" }),
                                                            React.createElement(label_1.Label, { htmlFor: "secondOwnerBad", className: "cursor-pointer text-base" }, "Bad (below 580)"))),
                                                    errors.secondOwnerCreditScore && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerCreditScore)),
                                                React.createElement("div", { className: "space-y-2" },
                                                    React.createElement(label_1.Label, { htmlFor: "secondOwnerPercentageOwnership" },
                                                        "Percentage Ownership ",
                                                        React.createElement("span", { className: "text-red-500" }, "*")),
                                                    React.createElement(input_1.Input, { id: "secondOwnerPercentageOwnership", name: "secondOwnerPercentageOwnership", type: "number", min: "0", max: "100", value: formData.secondOwnerPercentageOwnership, onChange: function (e) {
                                                            handleChange(e);
                                                            if (errors.secondOwnerPercentageOwnership)
                                                                setErrors(function (prev) { return (__assign(__assign({}, prev), { secondOwnerPercentageOwnership: "" })); });
                                                        }, placeholder: "Enter ownership percentage", className: "bg-white border-gray-300 text-gray-900 pr-8 ".concat(errors.secondOwnerPercentageOwnership ? "border-red-500" : "") }),
                                                    errors.secondOwnerPercentageOwnership && React.createElement("p", { className: "text-red-500 text-sm" }, errors.secondOwnerPercentageOwnership)))))),
                                    React.createElement(card_1.CardFooter, { className: "flex justify-between pt-4" },
                                        React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: prevStep, className: "font-semibold bg-transparent" }, "Previous"),
                                        React.createElement(button_1.Button, { type: "button", onClick: function () {
                                                if (DEV_MODE || validateStep3()) {
                                                    nextStep();
                                                }
                                            }, className: "bg-orange-500 hover:bg-orange-600 text-white" }, "Next Step"))))),
                            step === 5 && (React.createElement(React.Fragment, null,
                                React.createElement(conversion_tracking_1.ConversionTracking, { eventName: "InitiateCheckout", eventData: { content_type: "application_step_5" } }),
                                React.createElement("div", { className: "bg-white rounded-xl p-6 mb-6 shadow-sm border-2 border-orange-400" },
                                    React.createElement("div", { className: "flex items-start gap-4" },
                                        React.createElement("div", { className: "flex-shrink-0" },
                                            React.createElement("svg", { className: "w-12 h-12 md:w-14 md:h-14", viewBox: "0 0 64 64", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                                React.createElement("rect", { x: "12", y: "4", width: "40", height: "56", rx: "4", fill: "#fed7aa", className: "drop-shadow-lg" }),
                                                React.createElement("path", { d: "M42 4L52 14H46C43.7909 14 42 12.2091 42 10V4Z", fill: "#fdba74" }),
                                                React.createElement("path", { d: "M42 4V10C42 12.2091 43.7909 14 46 14H52", stroke: "#f97316", strokeWidth: "1.5" }),
                                                React.createElement("rect", { x: "20", y: "22", width: "24", height: "3", rx: "1.5", fill: "#f97316" },
                                                    React.createElement("animate", { attributeName: "opacity", values: "0.4;1;0.4", dur: "2s", repeatCount: "indefinite", begin: "0s" })),
                                                React.createElement("rect", { x: "20", y: "30", width: "20", height: "3", rx: "1.5", fill: "#fb923c" },
                                                    React.createElement("animate", { attributeName: "opacity", values: "0.4;1;0.4", dur: "2s", repeatCount: "indefinite", begin: "0.2s" })),
                                                React.createElement("rect", { x: "20", y: "38", width: "22", height: "3", rx: "1.5", fill: "#f97316" },
                                                    React.createElement("animate", { attributeName: "opacity", values: "0.4;1;0.4", dur: "2s", repeatCount: "indefinite", begin: "0.4s" })),
                                                React.createElement("rect", { x: "20", y: "46", width: "16", height: "3", rx: "1.5", fill: "#fb923c" },
                                                    React.createElement("animate", { attributeName: "opacity", values: "0.4;1;0.4", dur: "2s", repeatCount: "indefinite", begin: "0.6s" })),
                                                React.createElement("circle", { cx: "48", cy: "48", r: "12", fill: "#22c55e" },
                                                    React.createElement("animate", { attributeName: "r", values: "11;12;11", dur: "1.5s", repeatCount: "indefinite" })),
                                                React.createElement("path", { d: "M43 48L46 51L53 44", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }))),
                                        React.createElement("div", null,
                                            React.createElement("h2", { className: "text-xl md:text-2xl font-bold mb-2 text-gray-900" }, "Review Your Application"),
                                            React.createElement("p", { className: "text-gray-600 text-sm md:text-base" }, "Please verify all information is correct before submitting. You can go back to edit any section.")))),
                                React.createElement("div", { className: "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-xl p-4 md:p-6 mb-6 shadow-sm" },
                                    React.createElement("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4" },
                                        React.createElement("div", { className: "flex items-start gap-3 flex-1" },
                                            React.createElement("svg", { className: "w-6 h-6 text-green-600 flex-shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })),
                                            React.createElement("div", null,
                                                React.createElement("h3", { className: "font-semibold text-green-900 mb-1" }, "Signature Required"),
                                                React.createElement("p", { className: "text-sm text-green-800" }, showSecondOwner && formData.secondOwnerFirstName
                                                    ? "".concat(!formData.signatureImage ? 'Primary owner' : '').concat(!formData.signatureImage && !secondOwnerSignatureImage ? ' and ' : '').concat(!secondOwnerSignatureImage ? 'Second owner' : '', " signature required to submit.")
                                                    : 'Owner signature required to proceed with submission.'))),
                                        React.createElement("div", { className: "flex gap-2 w-full md:w-auto md:flex-col" },
                                            !formData.signatureImage ? (React.createElement(button_1.Button, { type: "button", onClick: function () { return openSignatureModalForOwner(0); }, className: "flex-1 md:flex-none btn-green-elite text-white font-medium px-6 py-2.5" },
                                                React.createElement("svg", { className: "w-4 h-4 mr-2 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" })),
                                                "Primary Owner")) : (React.createElement("div", { className: "flex-1 md:flex-none bg-green-100 text-green-700 font-medium px-6 py-2.5 rounded-lg flex items-center justify-center gap-2" },
                                                React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-4 w-4" }),
                                                "Signed")),
                                            showSecondOwner && formData.secondOwnerFirstName && (!secondOwnerSignatureImage ? (React.createElement(button_1.Button, { type: "button", onClick: function () { return openSignatureModalForOwner(1); }, className: "flex-1 md:flex-none btn-blue-elite text-white font-medium px-6 py-2.5" },
                                                React.createElement("svg", { className: "w-4 h-4 mr-2 inline", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" })),
                                                "Second Owner")) : (React.createElement("div", { className: "flex-1 md:flex-none bg-blue-100 text-blue-700 font-medium px-6 py-2.5 rounded-lg flex items-center justify-center gap-2" },
                                                React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-4 w-4" }),
                                                "Signed")))))),
                                React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden" },
                                    React.createElement("div", { className: "bg-white px-4 md:px-6 py-4 border-b border-gray-200 cursor-pointer", onClick: function () { return toggleSection('funding'); } },
                                        React.createElement("div", { className: "flex items-center justify-between" },
                                            React.createElement("div", { className: "flex items-center gap-3" },
                                                React.createElement("div", { className: "w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold" }, expandedSections.funding ? '1' : React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5" })),
                                                React.createElement("div", null,
                                                    React.createElement("h3", { className: "font-semibold text-gray-900 text-lg" }, "Funding Information"),
                                                    !expandedSections.funding && (React.createElement("p", { className: "text-sm text-gray-600" },
                                                        "$",
                                                        Number(formData.amountRequested).toLocaleString(),
                                                        " requested")))),
                                            React.createElement("div", { className: "flex items-center gap-2" },
                                                React.createElement(button_1.Button, { type: "button", variant: "ghost", size: "sm", onClick: function (e) { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); setStep(1); }, className: "text-blue-600 hover:text-blue-700 hover:bg-blue-50" }, "Edit"),
                                                React.createElement(lucide_react_1.ChevronDownIcon, { className: "h-5 w-5 text-gray-500 transition-transform duration-200 ".concat(expandedSections.funding ? 'rotate-180' : '') })))),
                                    React.createElement("div", { className: "transition-all duration-300 ease-in-out ".concat(expandedSections.funding ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden') },
                                        React.createElement("div", { className: "p-4 md:p-6" },
                                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                                                React.createElement("div", { className: "bg-gray-50 rounded-lg p-4" },
                                                    React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "Amount Requested"),
                                                    React.createElement("p", { className: "text-xl font-bold text-gray-900" },
                                                        "$",
                                                        Number(formData.amountRequested).toLocaleString())),
                                                React.createElement("div", { className: "bg-gray-50 rounded-lg p-4" },
                                                    React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "Use of Funds"),
                                                    React.createElement("p", { className: "text-sm text-gray-700" }, formData.useOfFunds)))))),
                                React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden" },
                                    React.createElement("div", { className: "bg-white px-4 md:px-6 py-4 border-b border-gray-200 cursor-pointer", onClick: function () { return toggleSection('business'); } },
                                        React.createElement("div", { className: "flex items-center justify-between" },
                                            React.createElement("div", { className: "flex items-center gap-3" },
                                                React.createElement("div", { className: "w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold" }, expandedSections.business ? '2' : React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5" })),
                                                React.createElement("div", null,
                                                    React.createElement("h3", { className: "font-semibold text-gray-900 text-lg" }, "Business Information"),
                                                    !expandedSections.business && (React.createElement("p", { className: "text-sm text-gray-600" }, formData.businessName)))),
                                            React.createElement("div", { className: "flex items-center gap-2" },
                                                React.createElement(button_1.Button, { type: "button", variant: "ghost", size: "sm", onClick: function (e) { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); setStep(3); }, className: "text-blue-600 hover:text-blue-700 hover:bg-blue-50" }, "Edit"),
                                                React.createElement(lucide_react_1.ChevronDownIcon, { className: "h-5 w-5 text-gray-500 transition-transform duration-200 ".concat(expandedSections.business ? 'rotate-180' : '') }))),
                                        React.createElement("div", { className: "transition-all duration-300 ease-in-out ".concat(expandedSections.business ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden') },
                                            React.createElement("div", { className: "p-4 md:p-6" },
                                                React.createElement("div", { className: "bg-gray-50 rounded-lg p-4 mb-4" },
                                                    React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "Legal Business Name"),
                                                    React.createElement("p", { className: "text-lg font-semibold text-gray-900" }, formData.businessName),
                                                    formData.dba && React.createElement("p", { className: "text-sm text-gray-600 mt-1" },
                                                        "DBA: ",
                                                        formData.dba)),
                                                React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" },
                                                    React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Federal Tax ID (EIN)"),
                                                        React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.federalTaxId)),
                                                    React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Industry"),
                                                        React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.industry)),
                                                    React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Entity Type"),
                                                        React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.entityType || "N/A")),
                                                    React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Years in Business"),
                                                        React.createElement("p", { className: "text-sm font-medium text-gray-900" },
                                                            formData.yearsInBusiness,
                                                            " years")),
                                                    React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Annual Revenue"),
                                                        React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.annualRevenue)),
                                                    React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Start Date"),
                                                        React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.businessStartDate))),
                                                React.createElement("div", { className: "mt-4 pt-4 border-t border-gray-100" },
                                                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                                                        React.createElement("div", null,
                                                            React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "Business Address"),
                                                            React.createElement("p", { className: "text-sm text-gray-900" }, formData.businessAddress),
                                                            React.createElement("p", { className: "text-sm text-gray-900" },
                                                                formData.businessCity,
                                                                ", ",
                                                                formData.businessState,
                                                                " ",
                                                                formData.businessZip)),
                                                        React.createElement("div", null,
                                                            React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "Contact"),
                                                            React.createElement("p", { className: "text-sm text-gray-900" }, formData.businessPhone),
                                                            React.createElement("p", { className: "text-sm text-gray-900" }, formData.businessEmail))))))),
                                    React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden" },
                                        React.createElement("div", { className: "bg-white px-4 md:px-6 py-4 border-b border-gray-200 cursor-pointer", onClick: function () { return toggleSection('primaryOwner'); } },
                                            React.createElement("div", { className: "flex items-center justify-between" },
                                                React.createElement("div", { className: "flex items-center gap-3" },
                                                    React.createElement("div", { className: "w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold" }, expandedSections.primaryOwner ? '3' : React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5" })),
                                                    React.createElement("div", null,
                                                        React.createElement("h3", { className: "font-semibold text-gray-900 text-lg" }, "Primary Owner"),
                                                        !expandedSections.primaryOwner && (React.createElement("p", { className: "text-sm text-gray-600" },
                                                            formData.firstName,
                                                            " ",
                                                            formData.lastName,
                                                            " (",
                                                            formData.ownershipPercentage,
                                                            "%)")))),
                                                React.createElement("div", { className: "flex items-center gap-2" },
                                                    React.createElement(button_1.Button, { type: "button", variant: "ghost", size: "sm", onClick: function (e) { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); setStep(4); }, className: "text-blue-600 hover:text-blue-700 hover:bg-blue-50" }, "Edit"),
                                                    React.createElement(lucide_react_1.ChevronDownIcon, { className: "h-5 w-5 text-gray-500 transition-transform duration-200 ".concat(expandedSections.primaryOwner ? 'rotate-180' : '') }))),
                                            React.createElement("div", { className: "transition-all duration-300 ease-in-out ".concat(expandedSections.primaryOwner ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden') },
                                                React.createElement("div", { className: "p-4 md:p-6" },
                                                    React.createElement("div", { className: "bg-gray-50 rounded-lg p-4 mb-4" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "Full Name"),
                                                        React.createElement("p", { className: "text-lg font-semibold text-gray-900" },
                                                            formData.firstName,
                                                            " ",
                                                            formData.lastName),
                                                        React.createElement("p", { className: "text-sm text-gray-600 mt-1" },
                                                            formData.ownershipPercentage,
                                                            "% Ownership")),
                                                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" },
                                                        React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                            React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Phone"),
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.phone)),
                                                        React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                            React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Date of Birth"),
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.dateOfBirth)),
                                                        React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                            React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "SSN"),
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900" },
                                                                "***-**-",
                                                                formData.ssn.slice(-4))),
                                                        React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                            React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Credit Score"),
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900 capitalize" }, formData.creditScore))),
                                                    React.createElement("div", { className: "mt-4 pt-4 border-t border-gray-100" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "Home Address"),
                                                        React.createElement("p", { className: "text-sm text-gray-900" }, formData.homeAddress),
                                                        React.createElement("p", { className: "text-sm text-gray-900" },
                                                            formData.city,
                                                            ", ",
                                                            formData.state,
                                                            " ",
                                                            formData.zip)),
                                                    React.createElement("div", { className: "mt-4 pt-4 border-t border-gray-100" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "E-Signature"),
                                                        formData.signatureImage ? (React.createElement("div", { className: "flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg" },
                                                            React.createElement("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center" },
                                                                React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5 text-white" })),
                                                            React.createElement("div", { className: "flex-1" },
                                                                React.createElement("p", { className: "text-sm font-medium text-green-800" }, "Signed"),
                                                                React.createElement("p", { className: "text-xs text-green-600" },
                                                                    formData.firstName,
                                                                    " ",
                                                                    formData.lastName)),
                                                            React.createElement("img", { src: formData.signatureImage, alt: "Signature", className: "h-10 max-w-[120px] object-contain" }))) : (React.createElement(button_1.Button, { type: "button", onClick: function () { return openSignatureModalForOwner(0); }, className: "w-full sm:w-auto btn-green-elite text-white font-medium px-6 py-2" },
                                                            React.createElement("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" })),
                                                            "Sign Here")))))),
                                        showSecondOwner && (React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden" },
                                            React.createElement("div", { className: "bg-white px-4 md:px-6 py-4 border-b border-gray-200 cursor-pointer", onClick: function () { return toggleSection('secondOwner'); } },
                                                React.createElement("div", { className: "flex items-center justify-between" },
                                                    React.createElement("div", { className: "flex items-center gap-3" },
                                                        React.createElement("div", { className: "w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold" }, expandedSections.secondOwner ? '+' : React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5" })),
                                                        React.createElement("div", null,
                                                            React.createElement("h3", { className: "font-semibold text-gray-900 text-lg" }, "Second Owner"),
                                                            !expandedSections.secondOwner && (React.createElement("p", { className: "text-sm text-gray-600" },
                                                                formData.secondOwnerFirstName,
                                                                " ",
                                                                formData.secondOwnerLastName,
                                                                " (",
                                                                formData.secondOwnerPercentageOwnership,
                                                                "%)")))),
                                                    React.createElement("div", { className: "flex items-center gap-2" },
                                                        React.createElement(button_1.Button, { type: "button", variant: "ghost", size: "sm", onClick: function (e) { e.stopPropagation(); window.scrollTo({ top: 0, behavior: "smooth" }); setStep(4); } })))),
                                            React.createElement("div", { className: "transition-all duration-300 ease-in-out ".concat(expandedSections.secondOwner ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden') },
                                                React.createElement("div", { className: "p-4 md:p-6" },
                                                    React.createElement("div", { className: "bg-gray-50 rounded-lg p-4 mb-4" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-1" }, "Full Name"),
                                                        React.createElement("p", { className: "text-lg font-semibold text-gray-900" },
                                                            formData.secondOwnerFirstName,
                                                            " ",
                                                            formData.secondOwnerLastName),
                                                        React.createElement("p", { className: "text-sm text-gray-600 mt-1" },
                                                            formData.secondOwnerPercentageOwnership,
                                                            "% Ownership")),
                                                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" },
                                                        React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                            React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Phone"),
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.secondOwnerPhone)),
                                                        React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                            React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Date of Birth"),
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900" }, formData.secondOwnerDateOfBirth)),
                                                        React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                            React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "SSN"),
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900" },
                                                                "***-**-",
                                                                formData.secondOwnerSsn.slice(-4))),
                                                        React.createElement("div", { className: "p-3 border border-gray-100 rounded-lg" },
                                                            React.createElement("p", { className: "text-xs text-gray-500 mb-1" }, "Credit Score"),
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900 capitalize" }, formData.secondOwnerCreditScore))),
                                                    React.createElement("div", { className: "mt-4 pt-4 border-t border-gray-100" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "Home Address"),
                                                        React.createElement("p", { className: "text-sm text-gray-900" }, formData.secondOwnerHomeAddress),
                                                        React.createElement("p", { className: "text-sm text-gray-900" },
                                                            formData.secondOwnerCity,
                                                            ", ",
                                                            formData.secondOwnerState,
                                                            " ",
                                                            formData.secondOwnerZipCode)),
                                                    React.createElement("div", { className: "mt-4 pt-4 border-t border-gray-100" },
                                                        React.createElement("p", { className: "text-xs text-gray-500 uppercase tracking-wide mb-2" }, "E-Signature"),
                                                        secondOwnerSignatureImage ? (React.createElement("div", { className: "flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg" },
                                                            React.createElement("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center" },
                                                                React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5 text-white" })),
                                                            React.createElement("div", { className: "flex-1" },
                                                                React.createElement("p", { className: "text-sm font-medium text-green-800" }, "Signed"),
                                                                React.createElement("p", { className: "text-xs text-green-600" },
                                                                    formData.secondOwnerFirstName,
                                                                    " ",
                                                                    formData.secondOwnerLastName)),
                                                            React.createElement("img", { src: secondOwnerSignatureImage, alt: "Signature", className: "h-10 max-w-[120px] object-contain" }))) : (React.createElement(button_1.Button, { type: "button", onClick: function () { return openSignatureModalForOwner(1); }, className: "w-full sm:w-auto btn-green-elite text-white font-medium px-6 py-2" },
                                                            React.createElement("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" })),
                                                            "Sign Here"))))))),
                                        errors.submit && (React.createElement("div", { className: "bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 flex gap-3" },
                                            React.createElement("div", { className: "flex-shrink-0 flex items-center justify-center h-6 w-6" },
                                                React.createElement("svg", { className: "h-6 w-6 text-red-500", fill: "currentColor", viewBox: "0 0 20 20" },
                                                    React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }))),
                                            React.createElement("div", { className: "flex-1" },
                                                React.createElement("h3", { className: "text-sm font-medium text-red-800" }, "Submission Error"),
                                                React.createElement("p", { className: "text-sm text-red-700 mt-1" }, errors.submit)))),
                                        errors.signature && (React.createElement("div", { className: "bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 flex gap-3" },
                                            React.createElement("div", { className: "flex-shrink-0 flex items-center justify-center h-6 w-6" },
                                                React.createElement("svg", { className: "h-6 w-6 text-red-500", fill: "currentColor", viewBox: "0 0 20 20" },
                                                    React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }))),
                                            React.createElement("div", { className: "flex-1" },
                                                React.createElement("h3", { className: "text-sm font-medium text-red-800" }, "Signature Required"),
                                                React.createElement("p", { className: "text-sm text-red-700 mt-1" }, errors.signature)))),
                                        React.createElement("div", { className: "bg-amber-50 border border-amber-300 rounded-xl p-4 md:p-6 mb-6" },
                                            React.createElement("h3", { className: "font-semibold text-amber-900 mb-3 flex items-center gap-2" },
                                                React.createElement("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20" },
                                                    React.createElement("path", { fillRule: "evenodd", d: "M13.816 4.477a.5.5 0 00-.596.04L7.5 9.338V7a.5.5 0 00-1 0v5a.5.5 0 00.5.5h5a.5.5 0 000-1H8.338l4.821-5.72a.5.5 0 00-.343-.803z", clipRule: "evenodd" })),
                                                "Legal Acknowledgment"),
                                            React.createElement("div", { className: "text-sm text-amber-900 space-y-3" },
                                                React.createElement("p", null, "By signing and submitting this application, you acknowledge and certify that:"),
                                                React.createElement("ul", { className: "list-disc list-inside space-y-2 text-amber-800" },
                                                    React.createElement("li", null, "All information provided in this application is true, accurate, and complete to the best of your knowledge."),
                                                    React.createElement("li", null, "You authorize TurboFunding to verify any information contained herein and retrieve your consumer credit report(s)."),
                                                    React.createElement("li", null, "You understand that your personal financial information is protected under the Gramm-Leach-Bliley Act (GLBA) and will be kept confidential."),
                                                    React.createElement("li", null,
                                                        "You have read our ",
                                                        React.createElement(link_1.default, { href: "/privacy", className: "text-amber-700 hover:text-amber-800 underline font-medium" }, "Privacy Policy"),
                                                        " and understand how your data is collected, used, and protected."),
                                                    React.createElement("li", null, "You consent to the electronic storage and processing of your sensitive financial documents using industry-standard encryption.")),
                                                React.createElement("p", { className: "text-xs text-amber-700 mt-3" },
                                                    React.createElement("strong", null, "Important:"),
                                                    " Providing false information on a loan application is a federal crime punishable by fine and imprisonment."))),
                                        React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6" },
                                            React.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4" },
                                                React.createElement(button_1.Button, { type: "button", variant: "outline", onClick: prevStep, disabled: isSubmitting, className: "w-full sm:w-auto font-semibold bg-transparent order-2 sm:order-1" }, "\u2190 Previous Step"),
                                                React.createElement("div", { className: "w-full sm:w-auto text-center order-1 sm:order-2" },
                                                    !allSignaturesCollected && (React.createElement("p", { className: "text-xs text-orange-600 mb-2 hidden sm:block" }, hasTwoOwners
                                                        ? "".concat(!formData.signatureImage ? 'Primary owner' : '').concat(!formData.signatureImage && !secondOwnerSignatureImage ? ' and ' : '').concat(!secondOwnerSignatureImage ? 'Second owner' : '', " signature required")
                                                        : 'Owner signature required')),
                                                    allSignaturesCollected && (React.createElement("p", { className: "text-xs text-green-600 mb-2 hidden sm:block" }, "All signatures collected \u2713")),
                                                    React.createElement(button_1.Button, { type: "button", onClick: handleSubmitApplication, disabled: isSubmitting || !allSignaturesCollected, className: "w-full sm:w-auto font-semibold px-8 py-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ".concat(allSignaturesCollected
                                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/25'
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed') }, "Submit Application \u2192")))),
                                        isSubmitting && (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" },
                                            React.createElement("div", { className: "bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4" },
                                                React.createElement("div", { className: "relative" },
                                                    React.createElement("div", { className: "w-16 h-16 border-4 border-orange-200 rounded-full" }),
                                                    React.createElement("div", { className: "absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin" })),
                                                React.createElement("div", { className: "text-center" },
                                                    React.createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-1" }, "Submitting Application"),
                                                    React.createElement("p", { className: "text-sm text-gray-600" }, "Please wait while we process your application...")))))),
                                    ")}",
                                    step === 6 && (React.createElement(React.Fragment, null,
                                        React.createElement(conversion_tracking_1.ConversionTracking, { eventName: "Purchase", eventData: {
                                                content_type: "application_submitted",
                                                business_name: formData.legalBusinessName,
                                                funding_purpose: formData.fundingPurpose,
                                                business_type: formData.businessType,
                                            }, value: getFundingAmountValue(formData.fundingAmount), currency: "USD" }),
                                        React.createElement("div", { className: "btn-blue-elite rounded-xl p-5 md:p-6 mb-6 shadow-lg" },
                                            React.createElement("div", { className: "flex items-center gap-4" },
                                                React.createElement("div", { className: "flex-shrink-0 w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center" },
                                                    React.createElement("svg", { className: "w-7 h-7 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }))),
                                                React.createElement("div", { className: "flex-1" },
                                                    React.createElement("h4", { className: "font-bold text-white text-lg mb-1" }, "Speed Up Your Approval!"),
                                                    React.createElement("p", { className: "text-white/90 text-sm" }, "Upload your bank statements and business documents now to expedite your review and get funded faster.")),
                                                React.createElement(button_1.Button, { onClick: function () {
                                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                                        setStep(7);
                                                    }, className: "hidden sm:flex bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 shadow-md" }, "Upload Now \u2192")),
                                            React.createElement(button_1.Button, { onClick: function () {
                                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                                    setStep(6);
                                                }, className: "sm:hidden w-full mt-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3" }, "Upload Documents Now \u2192")),
                                        React.createElement("div", { className: "bg-white rounded-xl p-6 md:p-8 mb-6 shadow-sm border border-gray-200 text-center" },
                                            React.createElement("div", { className: "mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4" },
                                                React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-10 w-10 text-green-500" })),
                                            React.createElement("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900 mb-2" }, "Application Submitted!"),
                                            React.createElement("p", { className: "text-gray-600 text-lg" }, "Thank you for choosing TurboFunding.com")),
                                        React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-4 p-6" },
                                            React.createElement("div", { className: "text-center mb-6" },
                                                React.createElement("p", { className: "text-gray-700 leading-relaxed" },
                                                    "We've received your application and our team will review it promptly. You can expect to hear from one of our funding specialists within ",
                                                    React.createElement("span", { className: "font-semibold text-orange-500" }, "1 business day"),
                                                    ".")),
                                            React.createElement("div", { className: "bg-blue-50 rounded-xl p-4 border border-blue-100" },
                                                React.createElement("div", { className: "flex items-center gap-3 mb-2" },
                                                    React.createElement("svg", { className: "w-5 h-5 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })),
                                                    React.createElement("span", { className: "font-medium text-gray-900" }, "Confirmation Sent")),
                                                React.createElement("p", { className: "text-sm text-gray-600" },
                                                    "A confirmation email has been sent to ",
                                                    React.createElement("span", { className: "font-semibold text-gray-800" }, formData.email),
                                                    " with your application details.")),
                                            React.createElement("div", { className: "bg-green-50 rounded-xl p-4 border border-green-200 mt-4" },
                                                React.createElement("div", { className: "flex items-start gap-3" },
                                                    React.createElement("svg", { className: "w-5 h-5 text-green-600 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20" },
                                                        React.createElement("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" })),
                                                    React.createElement("div", null,
                                                        React.createElement("p", { className: "font-medium text-green-900 text-sm mb-1" }, "Your Data is Protected"),
                                                        React.createElement("p", { className: "text-sm text-green-800" }, "All your personal and financial information is encrypted using AES-256 encryption and protected under the Gramm-Leach-Bliley Act (GLBA). Your information will never be shared without your explicit consent."))))),
                                        React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden" },
                                            React.createElement("div", { className: "bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4" },
                                                React.createElement("h3", { className: "text-lg font-semibold text-white" }, "What Happens Next?")),
                                            React.createElement("div", { className: "p-6" },
                                                React.createElement("div", { className: "space-y-4" }, [
                                                    { num: 1, title: "Application Review", desc: "Our team will carefully review your application and documents" },
                                                    { num: 2, title: "Specialist Contact", desc: "A dedicated funding specialist will reach out to discuss your options" },
                                                    { num: 3, title: "Tailored Solutions", desc: "We'll present you with customized funding solutions that fit your needs" },
                                                    { num: 4, title: "Fast Funding", desc: "Once approved, funding can be available in as little as 24-48 hours" },
                                                ].map(function (_a) {
                                                    var num = _a.num, title = _a.title, desc = _a.desc;
                                                    return (React.createElement("div", { key: num, className: "flex items-start gap-4" },
                                                        React.createElement("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center" },
                                                            React.createElement("span", { className: "text-sm font-bold text-orange-600" }, num)),
                                                        React.createElement("div", null,
                                                            React.createElement("h4", { className: "font-medium text-gray-900" }, title),
                                                            React.createElement("p", { className: "text-sm text-gray-600" }, desc))));
                                                })))),
                                        React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6" },
                                            pdfDownloadError && (React.createElement("div", { className: "bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-4 flex gap-3" },
                                                React.createElement("div", { className: "flex-shrink-0 flex items-center justify-center h-6 w-6" },
                                                    React.createElement("svg", { className: "h-6 w-6 text-red-500", fill: "currentColor", viewBox: "0 0 20 20" },
                                                        React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }))),
                                                React.createElement("div", { className: "flex-1" },
                                                    React.createElement("h3", { className: "text-sm font-medium text-red-800" }, "PDF Download Error"),
                                                    React.createElement("p", { className: "text-sm text-red-700 mt-1" }, pdfDownloadError),
                                                    React.createElement("button", { onClick: function () { return setPdfDownloadError(null); }, className: "text-xs text-red-600 hover:text-red-700 font-medium mt-2 underline" }, "Dismiss")))),
                                            React.createElement("div", { className: "space-y-3" },
                                                React.createElement(button_1.Button, { onClick: handleDownloadPDF, disabled: isDownloadingPDF, className: "w-full btn-green-elite text-white font-semibold py-3 disabled:opacity-70" }, isDownloadingPDF ? (React.createElement("span", { className: "flex items-center justify-center gap-2" },
                                                    React.createElement("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                                                    "Generating PDF...")) : (React.createElement("span", { className: "flex items-center justify-center gap-2" },
                                                    React.createElement("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" })),
                                                    "Download Application PDF"))),
                                                React.createElement(button_1.Button, { onClick: function () {
                                                        setStep(1);
                                                        router.push("/");
                                                    }, variant: "outline", className: "w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3" }, "Return to Home"))))),
                                    step === 7 && (React.createElement(React.Fragment, null,
                                        React.createElement(conversion_tracking_1.ConversionTracking, { eventName: "AddPaymentInfo", eventData: { content_type: "application_step_6" } }),
                                        React.createElement("div", { className: "bg-white rounded-xl p-6 md:p-8 mb-6 shadow-sm border border-gray-200" },
                                            React.createElement("div", { className: "flex items-start gap-4" },
                                                React.createElement("div", { className: "flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center" },
                                                    React.createElement("svg", { className: "w-7 h-7 md:w-8 md:h-8 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }))),
                                                React.createElement("div", { className: "flex-1" },
                                                    React.createElement("h2", { className: "text-xl md:text-2xl font-bold text-gray-900 mb-2" }, "Upload Documents"),
                                                    React.createElement("p", { className: "text-gray-600 text-sm md:text-base" }, "Speed up your approval by uploading your business documents now. This helps us process your application faster.")))),
                                        React.createElement("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-4 md:p-6 mb-6" },
                                            React.createElement("div", { className: "flex items-start gap-4" },
                                                React.createElement("svg", { className: "w-6 h-6 text-green-600 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20" },
                                                    React.createElement("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" })),
                                                React.createElement("div", { className: "flex-1" },
                                                    React.createElement("h3", { className: "font-semibold text-green-900 mb-2" }, "Secure Document Upload"),
                                                    React.createElement("p", { className: "text-sm text-green-800 mb-2" },
                                                        "All documents you upload are protected by ",
                                                        React.createElement("span", { className: "font-medium" }, "AES-256 military-grade encryption"),
                                                        " and comply with the ",
                                                        React.createElement("span", { className: "font-medium" }, "Gramm-Leach-Bliley Act (GLBA)"),
                                                        "."),
                                                    React.createElement("p", { className: "text-xs text-green-700" }, "Your files are encrypted immediately upon upload and stored securely. Only authorized TurboFunding personnel can access them via secure decryption.")))),
                                        React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden" },
                                            React.createElement("div", { className: "bg-gradient-to-r from-orange-500 to-orange-600 px-4 md:px-6 py-3" },
                                                React.createElement("div", { className: "flex items-center gap-2" },
                                                    React.createElement("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })),
                                                    React.createElement("h3", { className: "font-semibold text-white" }, "Bank Statements"),
                                                    React.createElement("span", { className: "ml-auto text-xs bg-white/20 text-white px-2 py-0.5 rounded-full" }, "Required"))),
                                            React.createElement("div", { className: "p-4 md:p-6" },
                                                React.createElement("p", { className: "text-sm text-gray-600 mb-4" },
                                                    "Please upload your ",
                                                    React.createElement("span", { className: "font-semibold" }, "last 3 months"),
                                                    " of business bank statements.",
                                                    React.createElement("span", { className: "text-orange-600 font-medium" }, " California applicants: Last 4 months required.")),
                                                React.createElement("div", { className: "border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all duration-200 ".concat(formData.bankStatements
                                                        ? 'border-green-400 bg-green-50'
                                                        : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50/50') },
                                                    React.createElement(input_1.Input, { id: "bankStatements", name: "bankStatements", type: "file", accept: ".pdf,.jpg,.jpeg,.png", onChange: handleFileChange, className: "hidden" }),
                                                    React.createElement(label_1.Label, { htmlFor: "bankStatements", className: "cursor-pointer flex flex-col items-center space-y-3" }, formData.bankStatements ? (React.createElement(React.Fragment, null,
                                                        React.createElement("div", { className: "w-14 h-14 rounded-full bg-green-100 flex items-center justify-center" },
                                                            React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-8 w-8 text-green-500" })),
                                                        React.createElement("div", null,
                                                            React.createElement("p", { className: "text-sm font-medium text-green-700" }, formData.bankStatements.name),
                                                            React.createElement("p", { className: "text-xs text-green-600 mt-1" }, "File uploaded successfully \u2022 Click to replace")))) : (React.createElement(React.Fragment, null,
                                                        React.createElement("div", { className: "w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center" },
                                                            React.createElement(lucide_react_1.UploadIcon, { className: "h-7 w-7 text-orange-500" })),
                                                        React.createElement("div", null,
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-700" }, "Click to upload or drag and drop"),
                                                            React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "PDF, JPG, PNG up to 10MB")))))))),
                                        fileValidationErrors.bankStatements && (React.createElement("div", { className: "bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-4 flex gap-3" },
                                            React.createElement("svg", { className: "h-6 w-6 text-red-500 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20" },
                                                React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" })),
                                            React.createElement("div", { className: "flex-1" },
                                                React.createElement("h3", { className: "text-sm font-medium text-red-800" }, "Bank Statements File Error"),
                                                React.createElement("p", { className: "text-sm text-red-700 mt-1" }, fileValidationErrors.bankStatements)))),
                                        fileValidationErrors.otherDocuments && (React.createElement("div", { className: "bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 mb-4 flex gap-3" },
                                            React.createElement("svg", { className: "h-6 w-6 text-amber-500 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20" },
                                                React.createElement("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" })),
                                            React.createElement("div", { className: "flex-1" },
                                                React.createElement("h3", { className: "text-sm font-medium text-amber-800" }, "Other Documents File Error"),
                                                React.createElement("p", { className: "text-sm text-amber-700 mt-1" }, fileValidationErrors.otherDocuments)))),
                                        React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden" },
                                            React.createElement("div", { className: "bg-gray-100 px-4 md:px-6 py-3 border-b border-gray-200" },
                                                React.createElement("div", { className: "flex items-center gap-2" },
                                                    React.createElement("svg", { className: "w-5 h-5 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" })),
                                                    React.createElement("h3", { className: "font-semibold text-gray-700" }, "Other Documents"),
                                                    React.createElement("span", { className: "ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full" }, "Optional"))),
                                            React.createElement("div", { className: "p-4 md:p-6" },
                                                React.createElement("p", { className: "text-sm text-gray-600 mb-4" }, "Additional documents that may help expedite your application (business licenses, tax returns, etc.)"),
                                                React.createElement("div", { className: "border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all duration-200 ".concat(formData.otherDocuments
                                                        ? 'border-green-400 bg-green-50'
                                                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50') },
                                                    React.createElement(input_1.Input, { id: "otherDocuments", name: "otherDocuments", type: "file", accept: ".pdf,.jpg,.jpeg,.png", onChange: handleFileChange, className: "hidden" }),
                                                    React.createElement(label_1.Label, { htmlFor: "otherDocuments", className: "cursor-pointer flex flex-col items-center space-y-3" }, formData.otherDocuments ? (React.createElement(React.Fragment, null,
                                                        React.createElement("div", { className: "w-14 h-14 rounded-full bg-green-100 flex items-center justify-center" },
                                                            React.createElement(lucide_react_1.CheckCircleIcon, { className: "h-8 w-8 text-green-500" })),
                                                        React.createElement("div", null,
                                                            React.createElement("p", { className: "text-sm font-medium text-green-700" }, formData.otherDocuments.name),
                                                            React.createElement("p", { className: "text-xs text-green-600 mt-1" }, "File uploaded successfully \u2022 Click to replace")))) : (React.createElement(React.Fragment, null,
                                                        React.createElement("div", { className: "w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center" },
                                                            React.createElement(lucide_react_1.UploadIcon, { className: "h-7 w-7 text-gray-400" })),
                                                        React.createElement("div", null,
                                                            React.createElement("p", { className: "text-sm font-medium text-gray-700" }, "Click to upload or drag and drop"),
                                                            React.createElement("p", { className: "text-xs text-gray-500 mt-1" }, "PDF, JPG, PNG up to 10MB")))))))),
                                        React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden" },
                                            React.createElement("div", { className: "bg-blue-50 px-4 md:px-6 py-3 border-b border-blue-100" },
                                                React.createElement("div", { className: "flex items-center gap-2" },
                                                    React.createElement("svg", { className: "w-5 h-5 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })),
                                                    React.createElement("h3", { className: "font-semibold text-blue-700" }, "Document Guidelines"))),
                                            React.createElement("div", { className: "p-4 md:p-6" },
                                                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" }, [
                                                    { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "All documents should be clear and legible" },
                                                    { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", text: "Bank statements must show business name" },
                                                    { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Documents can be uploaded later if needed" },
                                                    { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", text: "Additional docs may be required per product" },
                                                ].map(function (_a, idx) {
                                                    var icon = _a.icon, text = _a.text;
                                                    return (React.createElement("div", { key: idx, className: "flex items-start gap-3 p-3 bg-gray-50 rounded-lg" },
                                                        React.createElement("svg", { className: "w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: icon })),
                                                        React.createElement("span", { className: "text-sm text-gray-700" }, text)));
                                                })))),
                                        React.createElement("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6" },
                                            uploadError && (React.createElement("div", { className: "bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-4 flex gap-3" },
                                                React.createElement("div", { className: "flex-shrink-0" },
                                                    React.createElement("svg", { className: "h-6 w-6 text-red-500", fill: "currentColor", viewBox: "0 0 20 20" },
                                                        React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }))),
                                                React.createElement("div", { className: "flex-1" },
                                                    React.createElement("h3", { className: "text-sm font-medium text-red-800" }, "Upload Error"),
                                                    React.createElement("p", { className: "text-sm text-red-700 mt-1" }, uploadError),
                                                    React.createElement("button", { onClick: function () { return setUploadError(null); }, className: "text-xs text-red-600 hover:text-red-700 font-medium mt-2 underline" }, "Dismiss")))),
                                            globalError && (React.createElement("div", { className: "bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 mb-4 flex gap-3" },
                                                React.createElement("div", { className: "flex-shrink-0" },
                                                    React.createElement("svg", { className: "h-6 w-6 text-amber-500", fill: "currentColor", viewBox: "0 0 20 20" },
                                                        React.createElement("path", { fillRule: "evenodd", d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }))),
                                                React.createElement("div", { className: "flex-1" },
                                                    React.createElement("h3", { className: "text-sm font-medium text-amber-800" }, "Warning"),
                                                    React.createElement("p", { className: "text-sm text-amber-700 mt-1" }, globalError)))),
                                            React.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4" },
                                                React.createElement(button_1.Button, { type: "button", variant: "outline", setStep: true }),
                                                "(6) className=\"w-full sm:w-auto font-semibold bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 order-2 sm:order-1\" >",
                                                React.createElement(lucide_react_1.ArrowLeftIcon, { className: "mr-2 h-4 w-4" }),
                                                "Back to Confirmation"),
                                            React.createElement("div", { className: "w-full sm:w-auto text-center order-1 sm:order-2" },
                                                React.createElement(button_1.Button, { type: "button", onClick: handleDocumentUpload, disabled: isUploadingDocs, className: "w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 shadow-lg shadow-green-500/25 disabled:opacity-50" }, isUploadingDocs ? (React.createElement(React.Fragment, null,
                                                    React.createElement("svg", { className: "animate-spin mr-2 h-5 w-5", fill: "none", viewBox: "0 0 24 24" },
                                                        React.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                                                        React.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })),
                                                    "Uploading...")) : (React.createElement(React.Fragment, null,
                                                    React.createElement(lucide_react_1.CheckCircleIcon, { className: "mr-2 h-5 w-5" }),
                                                    "Complete Upload"))))))),
                                    "div>"),
                                ")}",
                                React.createElement("div", { className: "mt-8 pt-6 border-t border-gray-200" },
                                    React.createElement("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4" },
                                        React.createElement("div", { className: "flex gap-3" },
                                            React.createElement("svg", { className: "w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5", fill: "currentColor", viewBox: "0 0 20 20" },
                                                React.createElement("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" })),
                                            React.createElement("div", { className: "flex-1" },
                                                React.createElement("p", { className: "text-xs md:text-sm text-blue-900 font-medium mb-1" }, "Privacy & Data Security"),
                                                React.createElement("p", { className: "text-xs text-blue-800 leading-relaxed" },
                                                    "All information is encrypted with AES-256 encryption and protected under the Gramm-Leach-Bliley Act. We maintain strict confidentiality and safeguards. See our ",
                                                    React.createElement(link_1.default, { href: "/privacy", className: "text-blue-600 hover:text-blue-700 underline" }, "Privacy Policy"),
                                                    " for details."))))))),
                            "div>")))))));
}

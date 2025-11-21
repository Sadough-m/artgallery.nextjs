// sa: get collection id
import getCollectionId from "../../Hooks/getCollectionId";

export const HEADER_BASE = {
  "content-type": "application/json",
  "Accept-Language": "fr-IR,fr;q=0.5",
};

// mrx : 
import Cookies from "js-cookie";

//client google oath id
export const CLIENT_ID =
  "748830597814-mr2f81vave65iolekk8j6ud829ovbouj.apps.googleusercontent.com";

// mrx : base url
export const BASE_URL = `https://backend.artor.net/api`;
// export const BASE_URL = `https://backgallery.arezouarmina.ir/api`;

// mrx : base image url
export const BASE_Image_Url = `https://backend.artor.net/`;

// mrx : base image url
export const BASE_SSR_URL = `http://localhost:3000/api`;

// login url
export const GET_USER_DETAIL = `${BASE_URL}/User/Login`;

// mrx : collect or pay
export const TOGGLE_PAY = (Country) => `${BASE_URL}/User/ToggleTaxForUser/${Country}`;

// remove image from back
export const HANDLE_REMOVE_FILE = (FullPath) => `${BASE_URL}/UploadFile/DeleteCollectionLogo/${FullPath}`;

//login with google url
export const SIGNIN_EXTERNAL_ACCOUNT = `${BASE_URL}/User/ExternalLogin`;

//send registration email url
export const SEND_REGISTRATION_EMAIL = `${BASE_URL}/User/SendRegistrationEmail`;

//user forget password url
export const FORGOT_PASSWORD = `${BASE_URL}/User/ForgetPassword`;

//user reset password
export const RESEND_PASSWORD = `${BASE_URL}/User/ResetPassword`;

//resend verification email
export const RESEND_VERIFICATION_EMAIL = `${BASE_URL}/User/ReSendVerifyEmail`;

// step 3 passed 
export const STEP3_PASSED = `${BASE_URL}/User/UserPassStep3`;

//verify sent code
export const VERIFY_CODE = `${BASE_URL}/User/CheckVerifyCode`;

//verify sent code
export const VERIFY_CODE_FORGOT_PASSWORD = `${BASE_URL}/User/CheckForgetPasswordCode`;

export const GET_MAIN_DASHBOARD_DATA = `${BASE_URL}/User/GetDashboardMainData`;

//upload collection logo
export const UPLOAD_COLLECTION_LOGO = `${BASE_Image_Url}/UploadFile/UploadCollectionLogo`;

//upload collection logo  
export const UPLOAD_COLLECTION_LOGO_Step4 = `${BASE_URL}/UploadFile/UploadCollectionImage`;

// mrx : get user step 1
export const GET_USER_STEP_1 = `${BASE_URL}/User/GetUserRegisterStepOne`;

//create collection
export const CREAT_COLLECTION = `${BASE_URL}/Artwork/CreateNewCollection`;

// delete editions
export const DELETE_EDITIONS_IN_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/ArchiveOrDeleteListArtwork/${CollectionID}`;

//get test collection
export const TEST_COLLECTIONS = `${BASE_URL}/Artwork/GetUserCollectionsV2`;

//search artist collection
export const SEARCH_ARTIST = `${BASE_URL}/Artwork/SearchArtist`;

export const DISCONNECT_USER_GOOGLE = `${BASE_URL}/User/DisconnectUser`;

//get collection artist
export const COLLECTION_ARTIST = `${BASE_URL}/Artwork/GetCollectionArtist`; //{collectionId}/{isArchived}/{isSaved}`;

//search artist collection
export const TOGGLE_SAVE_ARTIST = `${BASE_URL}/Artwork/ToggleSaveArtistInCollection/`; //{collectionId}/{artistId}`;

//search artist collection
export const TOGGLE_ARCHIVE_ARTIST = `${BASE_URL}/Artwork/ToggleArchiveArtistInCollection`; //{collectionId}/{artistId}`;

export const EDIT_INFO_OVERVIEW = `${BASE_URL}/CvBuilder/UpdateCvOverViewByGallery`; //{collectionId}/{artistId}`;

// mrx : signup
export const SIGNUP = `${BASE_URL}/User/Register`;
//rs: update note
export const UPDATE_NOTE = `${BASE_URL}/Note/UpdateNote`;

export const UPDATE_NOTE_REAL = `${BASE_URL}/Note/AddNoteForArtistInColletion`;

export const UPDATE_NOTE_REAL_Contact = `${BASE_URL}/Note/AddNoteForContactInColletion`;

export const UPDATE_NOTE_REAL_ORDER = `${BASE_URL}/Note/AddNoteForOrderInColletion?collectionId=${getCollectionId()}`;

export const ADD_NEW_TAG_ORDER = (DraftOrderID) => `${BASE_URL}/Order/AddTagsToOrder/${DraftOrderID}/${getCollectionId()}`;

export const EDIT_INFO_CONTACT = (CollectionID) => `${BASE_URL}/Artwork/EditContactOverviewInCollection/${CollectionID}`;

export const EDIT_DEFULT_ADDRESS_CONTACT = (CollectionID) => `${BASE_URL}/Artwork/EditContactDefaultAddress/${CollectionID}`;

export const ADD_NOTE = `${BASE_URL}/Note/AddNote`;

// mrx : get landing cv 
export const GET_LANDING_CV = `${BASE_URL}/CvBuilder/GetCvByArtist`;

// mrx : get landing cv 
export const GET_CV_BUILDER_ARTIST = (ArtistID, CollectionID) => `${BASE_URL}/CvBuilder/GetCvByGallery/${CollectionID}/${ArtistID}`;

export const GET_CV_BUILDER_ARTIST_PRIVATE = (ArtistID, CollectionID) => `${BASE_URL}/CvBuilder/GetCvByGalleryPrivate/${CollectionID}/${ArtistID}`;

// mrx : get landing cv 
export const GET_SETTING_CV = `${BASE_URL}/CvBuilder/GetCvByArtist`;

export const EDIT_BIO = `${BASE_URL}/CvBuilder/UpdateCvBuilderBaseBio/`;

export const EDIT_TAGS = `${BASE_URL}/Artwork/ChangeArtistTagsInCollection`;

export const SEARCH_TAGS = (CollectionID, Search) => `${BASE_URL}/Artwork/SearchTagForArtist/${CollectionID}/${Search}`;

export const EDIT_TAX = (CollectionID, artistId) => `${BASE_URL}/Artwork/ToggleTaxForArtistInCollection/${CollectionID}/${artistId}`;

// mrx : signup with google
export const SIGNUP_WITH_GOOGLE = `${BASE_URL}/User/ExternalRegister`;

// mrx : signup step 1
export const SIGNUP_STEP1 = `${BASE_URL}/User/RegisterStepOne`;

// mrx : re send verify
export const RE_SEND_CODE = `${BASE_URL}/Authenticate/ReSendVerifyCode`;

// mrx : send verify for resetpassword
export const VERIFY_RESET_PASSWORD = `${BASE_URL}/Authenticate/ReSendForgetPasswordCode`;

// mrx : check is verif code for reset password is ok
export const CHECK_VERIFY_RESET_PASSWORD = `${BASE_URL}/Authenticate/VerifyForgetPasswordCode`;

// mrx : reset password
export const RESET_PASSWORD = `${BASE_URL}/Authenticate/ResetPassword`;

// mrx : verify Code
export const VERIFY = `${BASE_URL}/Authenticate/VerifyCode`;

// mrx : get step 2 select inputs data type
export const GET_SELECT_INPUTS_STEP_2 = `${BASE_URL}/Shared/GetLandingTypes`;

// mrx : get step 2 select inputs data type
export const GET_COUNTRY_SELECT = `${BASE_URL}/Shared/GetCountryListWithCity`;

// mrx : validate education
export const VALIDATE_CV_BUILDER_EDUCATIONLOCAL = `${BASE_URL}/CvBuilder/ValidateCvBuilderEducationLocal`;

// mrx : validate education
export const VALIDATE_CV_BUILDER_EXHIBITIONS = `${BASE_URL}/CvBuilder/ValidateCvBuilderSelectedExhibitionLocal`;

// mrx : validate education
export const SAVE_ARTIST_BY_ANOTHER = `${BASE_URL}/CvBuilder/SetCvByAnother`;

// mrx : validate BioLocal
export const VALIDATE_CV_BUILDER_BILBIOGRAPHY = `${BASE_URL}/CvBuilder/ValidateBioLocal`;

// mrx : validate ProfessionalAppointmentLocal
export const VALIDATE_CV_BUILDER_PROESSIONALAPPOINTMENTLOCAL = `${BASE_URL}/CvBuilder/ValidateCvBuilderProfessionalAppointmentLocal`;

// mrx : validate ProfessionalAppointmentLocal
export const VALIDATE_CV_BUILDER_GRANS_AND_AWARDS = `${BASE_URL}/CvBuilder/ValidateCvBuilderGrantAndAwardLocal`;

// mrx : validate CommissionLocal
export const VALIDATE_CV_BUILDER_COMMISSION = `${BASE_URL}/CvBuilder/ValidateCvBuilderCommissionLocal`;

// mrx : validate CommissionLocal
export const VALIDATE_CV_BUILDER_PUBLICATION = `${BASE_URL}/CvBuilder/ValidateCvBuilderPublicationLocal`;

// mrx : validate CommissionLocal
export const VALIDATE_CV_BUILDER_COLLECTIONS = `${BASE_URL}/CvBuilder/ValidateCvBuilderCollectionLocal`;

// mrx : validate CommissionLocal
export const VALIDATE_CV_BUILDER_PROFESSIONAL_SERVICE = `${BASE_URL}/CvBuilder/ValidateCvBuilderProfessionalServiceLocal`;

// mrx : validate CommissionLocal
export const VALIDATE_CV_BUILDER_PROFESSIONAL_ORGANIZATIONLOCAL = `${BASE_URL}/CvBuilder/ValidateCvBuilderProfessionalOrganizationLocal`;

// mrx : validate CommissionLocal
export const VALIDATE_CV_BUILDER_REPERESENATIONLOCAL = `${BASE_URL}/CvBuilder/ValidateCvBuilderReperesentationLocal`;

// mrx : Save all landing data CV Bulder
export const CV_BUILDER_SAVE_ALL_DATA = `${BASE_URL}/CvBuilder/SetCvByArtist`;

// mrx : Save all landing data CV Bulder
export const CV_BUILDER_ARTIST_GET_COUNTRY_NUMBERS = `${BASE_URL}/Shared/GetCountryPhoneCode`;

// mrx : Save all landing data CV Bulder
export const SAVE_ARTIST_CV_BUILDER = (CollectionID) => `${BASE_URL}/CvBuilder/SetCvByGallery/${CollectionID}`;

//get artist details details
export const ARTIST_DETAILS = `${BASE_URL}/Artwork/GetArtistDetail`; //{artistId}/{collectionId};

export const CONTACT_DETAILS = `${BASE_URL}/Artwork/GetCollectionContact`;

//get artwork list
export const GET_ARTWORK_BY_FILTER = (collectionId) => `${BASE_URL}/Artwork/GetArtworksByFilter/${collectionId}`; //{CollectionId}

//get artwork filter list
export const GET_FILTERDATA_IN_ARTWORK = (collectionId) => `${BASE_URL}/Artwork/GetFilterDataInArtworList/${collectionId}`; //{CollectionId}

// get artwork edition details
export const GET_ARTWORK_EDITION_DETAILS = `${BASE_URL}/Artwork/GetEditionTileInfo`; //{EditionId}/{CollectionId}

export const GET_ADD_WORK_MODAL_DATA = (CollectionID) =>
  `${BASE_URL}/Artwork/GetTypesInAddArtworkModal/${CollectionID}`;

export const GET_ADD_WORK_DATA = (CollectionID) =>
  `${BASE_URL}/Artwork/GetDataCreateArtworkPage/${CollectionID}`;

export const GET_SUBMEDIUMS_BY_ID = (MediumType) =>
  `${BASE_URL}/Artwork/GetSubMediumsByType/${MediumType}`;

export const GET_STYLE_INPUT_BY_ID = (MediumType) =>
  `${BASE_URL}/Artwork/GetStylesByType/${MediumType}`;

export const SEARCH_ADD_ARTWORK = (SearchText, CollectionID) =>
  `${BASE_URL}/Artwork/SearchArtistWithFilter/${SearchText}/${CollectionID}`;

// upload file for evry vere almost
export const POST_UPLOAD_FILE = (CollectionID, MediaID) => `${BASE_URL}/UploadFile/UploadArtworkMedia/${CollectionID}/${MediaID}`;


// upload file for evry vere almost
export const POST_MINTE_UPLOAD_FILE = (CollectionID) => `${BASE_URL}/UploadFile/UploadMintFile/${CollectionID}`;

// create collection with id
export const GET_CREATE_COLLECTION_DATA = `${BASE_URL}/Artwork/GetCreateCollectionData`;

// upload file for evry vere almost
export const GET_EDITION_WORKS = (text, EditionSize) => `${BASE_URL}/Artwork/CreateLimitedList/${text}/${EditionSize}`;

// get filter artist list for evry vere
export const GET_ARTIST_FILTER_LIST = (CollectionID) =>
  `${BASE_URL}/Artwork/GetArtistListFilter/${CollectionID}`;

// get filter artist list for evry vere
export const FILTER_ARTIST_LIST = (CollectionID) =>
  `${BASE_URL}/Artwork/SearchArtistInCollection/${CollectionID}`;

// get filter contact list for evry vere
export const FILTER_CONTACT_LIST = (CollectionID) =>
  `${BASE_URL}/Artwork/SearchContactInCollection/${CollectionID}`;

// get filter contact list for evry vere
export const FILTER_DRAFT_ORDER_LIST = (CollectionID) =>
  `${BASE_URL}/Order/FilterDraftOrderList/${CollectionID}`;

// get filter contact list for evry vere
export const FILTER_ORDER_LIST = (CollectionID) =>
  `${BASE_URL}/Order/FilterOrderList/${CollectionID}`;

// archive artist
export const ARCHIVE_ARTIST = (CollectionID, artistID) =>
  `${BASE_URL}/Artwork/ToggleArchiveArtistInCollection/${CollectionID}/${artistID}`;

// save artist
export const SAVE_ARTIST = (CollectionID, artistID) =>
  `${BASE_URL}/Artwork/ToggleSaveArtistInCollection/${CollectionID}/${artistID}`;

// archive order list by id
export const ARCHIVE_ORDER_LIST = (CollectionID, OrderID) =>
  `${BASE_URL}/Order/ToggleOrderArchive/${CollectionID}/${OrderID}`;

// add new collection
export const ADD_NEW_COLLECTION = `${BASE_URL}/Artwork/CreateNewCollection`;

// get user colabrator
export const GET_USER_COLlABRATOR = (CollectionID) => `${BASE_URL}/Artwork/GetUserCollabratorPermission/${CollectionID}`;

// edit and set colabrator
export const EDIT_USER_COLlABRATOR = (UserID, CollectionID, RoleAccessType) => `${BASE_URL}/Artwork/SetUserPermissionsInCollection/${UserID}/${CollectionID}/${RoleAccessType}`;

export const CREATE_USER_COLlABRATOR = (EmailAddress, CollectionID, RoleAccessType) => `${BASE_URL}/Artwork/AddUserPermissionInCollection/${EmailAddress}/${CollectionID}/${RoleAccessType}`;

export const DELETE_USER_COLlABRATOR = (UserID, CollectionID) => `${BASE_URL}/Artwork/RemoveCollabratorInCollection/${UserID}/${CollectionID}`;

// mrx : remove colabrator
export const REMOVE_USER_COLlABRATOR = `${BASE_URL}/Artwork/RemoveCollabratorInCollection`;

// invite peaple
export const INVITE_PEOPLE = `${BASE_URL}/User/InvitePeople`;

// edit collection
export const EDIT_COLLECTION = (collectionID) => `${BASE_URL}/Artwork/EditCollection/${collectionID}`;

// get user info
export const GET_USER_INFO = `${BASE_URL}/User/GetUserInfo`;

// mrx : change password for user
export const CHANGE_USER_PASSWORD = `${BASE_URL}/User/ChangePassword`;

// mrx : change password for user
export const UPDATE_EMAIL_NOTIFICATION = (EmailNotification) => `${BASE_URL}/User/UpdateIsEnableEmailNotification/${EmailNotification}`;

// create location
export const CREATE_LOCTION = `${BASE_URL}/User/AddUserLocation`;

// mrx : edit location
export const EDIT_LOCATION = `${BASE_URL}/User/UpdateUserLocation`;

// delete location
export const DELETE_LOCATION = (ID) => `${BASE_URL}/User/DeleteUserLocation/${ID}`;

// edit shipping address
export const EDIT_SHIPPING_ADDRESS = `${BASE_URL}/User/UpdateShippingAddress`;

// mrx : save setting cv
export const SAVE_SETTING_CV = `${BASE_URL}/CvBuilder/SetCvByArtist`;

// mrx : publish create cv
export const PUBLISHING_CV = `${BASE_URL}/CvBuilder/PublishCvBuilderCommision`;
export const PUBLISHING_CV_COLLECTION = `${BASE_URL}/CvBuilder/PublishCvBuilderCollection`;
export const PUBLISHING_CV_Reperesentation = `${BASE_URL}/CvBuilder/PublishCvBuilderReperesentation`;
export const PUBLISHING_CV_EDUCATION = `${BASE_URL}/CvBuilder/PublishCvBuilderEducation`;

export const GET_TAX_RATE_BY_COUNTRY = (Country) => `${BASE_URL}/User/GetTaxRateByCountry/${Country}`;

export const CREATE_UNIQUE_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/CreateUniqArtwork/${CollectionID}`;

export const CREATE_LIMITED_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/CreateLimitedArtwork/${CollectionID}`;

export const GET_ALL_ARTWORK_UNIQUE_BY_ID = (ID, CollectionID) => `${BASE_URL}/Artwork/GetUniqArtworkCompleteUser/${ID}/${CollectionID}`;

export const GET_ALL_ARTWORK_REPRODUCTION_BY_ID = (ID, CollectionID) => `${BASE_URL}/Artwork/GetReproductionArtworkMainInfo/${ID}/${CollectionID}`;

export const EDIT_UNIQUE_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/EditUniqArtwork/${CollectionID}`;

export const EDIT_PRIVACY_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/EditArtworkUserPrivacy/${CollectionID}`;

export const CREATE_REPRODUCTION_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/CreateReproductionrtwork/${CollectionID}`;

export const GET_REPRODUCATION_WITH_EDITIONS = (CollectionID, editionID) => `${BASE_URL}/Artwork/GetReproductionWithEditions/${CollectionID}/${editionID}`;

export const GET_ALL_ARTWORK_LIMITED_BY_ID = (ID, CollectionID) => `${BASE_URL}/Artwork/GetLimitedArtworkMainInfo/${ID}/${CollectionID}`;

export const EDIT_REPRODUCATION_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/EditReproductionArtworkMain/${CollectionID}`;

export const EDIT_SINGLE_EDITION_OF_LIMITED = (CollectionID) => `${BASE_URL}/Artwork/EditOneEditionOfLimited/${CollectionID}`;

export const EDIT_LIMITED_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/EditLimitedArtworkMain/${CollectionID}`;

export const SET_SELECTED_COLLECTION_OF_USER = (CollectionID) => `${BASE_URL}/User/SetUserDefaultCollection/${CollectionID}`;

export const SUBMIT_UNIQUE_MINTING = (CollectionID) => `${BASE_URL}/Artwork/RequestMintUniq/${CollectionID}`;

export const SUBMIT_LIM_REPO_MINTING = (CollectionID) => `${BASE_URL}/Artwork/RequestMintLimited/${CollectionID}`;
export const SUBMIT_LIM_REPO_MINTING_SINGLE = (CollectionID) => `${BASE_URL}/Artwork/RequestMintEditionOfLimited/${CollectionID}`;

export const DRAFT_UNIQUE_MINTING = (CollectionID) => `${BASE_URL}/Artwork/DraftMintUniq/${CollectionID}`;

export const SUBMIT_LIM_REPO_DRAFT = (CollectionID) => `${BASE_URL}/Artwork/DraftMintLimited/${CollectionID}`;

export const CHECK_MINT_STATUS = (ID, CollectionID) => `${BASE_URL}/Artwork/CheckMintingStatus/${ID}/${CollectionID}`;

export const SUBMIT_MORE_INFO_UNIQUE_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/SubmitMoreInfoUniqArtwork/${CollectionID}`;

export const SUBMIT_MORE_INFO_SINGLE_ARTWORK = (CollectionID) => `${BASE_URL}/Artwork/SubmitMoreInfoOneEditionOfLimited/${CollectionID}`;

export const DELETE_LOCAL_EDITIONS_LIMITED = (CollectionID, Classification) => `${BASE_URL}/Artwork/ResultOfDeleteEdition/${CollectionID}/${Classification}`;

export const TOGGLE_VERIFY_ACOUNT = (userID) => `${BASE_URL}/User/ToggleVerifyAccount/${userID}`;

export const USER_TOKEN = Cookies.get("tm3fn4t867oehg4863ftbkijuhy34gvfeiu736t4n");

export const PUBLISH_UNPUBLISH_MINTING = (ArtworkId, CollectionID, Status) => `${BASE_URL}/Artwork/PublishAndUnpublishArtwork/${ArtworkId}/${CollectionID}/${Status}`;

export const PUBLISH_UNPUBLISH_MINTING_SINGLE = (ArtworkId, CollectionID, Status) => `${BASE_URL}/Artwork/PublishAndUnpublishEditionOfLimited/${ArtworkId}/${CollectionID}/${Status}`;


export const GET_TYPES_DISCOVER_MODAL = `${BASE_URL}/Artwork/GetTypesDiscoverModal`;

export const EDIT_DISCOVER_MODAL = (CollectionID) => `${BASE_URL}/Artwork/EditEdditionDiscoverInfo/${CollectionID}`;

export const GET_DISCOVER_MODAL = (CollectionID, EditionID) => `${BASE_URL}/Artwork/GetEdditionDiscoverInfo/${CollectionID}/${EditionID}`;

export const SETTING_COMUNITY_USERNAME_VALIDATOR = (UserName) => `${BASE_URL}/User/IsAccessToSetUserName/${UserName}`;

export const EDIT_SETTING_COMUNITY_USERINFO = `${BASE_URL}/User/SetDisplaysInfo`;

export const DELETE_USER_PROFILE = `${BASE_URL}/User/DeleteUserProfileImage`;

export const CHNAGE_USER_PROFILE = `${BASE_URL}/User/SetProfileImage`;

export const UPLOAD_FILE_USER = `${BASE_URL}/UploadFile/UploadArtistProfileImage`;

export const UPDATE_ARTIST_EMAIL_LIST = `${BASE_URL}/Artwork/UpdateArtistEmailList`;

export const UPDATE_EDIT_INFO_BASE_OVERVIEW = `${BASE_URL}/CvBuilder/UpdateCvBuilderBaseOverView`;

export const ARHIVE_CONTACT = (CollectionID) => `${BASE_URL}/Artwork/ToggleArchiveContactInCollection/${CollectionID}`;

export const ADD_ARTIST_WITH_NO_CV = (ArtistID, CollectionID) => `${BASE_URL}/Artwork/AddArtistToCollection/${ArtistID}/${CollectionID}`;

export const DELETE_OR_ARCHIVE_ARTWORK = (CollectionID, EditionID, type, IsMain) => `${BASE_URL}/Artwork/ArchiveOrDeleteArtwork/${CollectionID}/${EditionID}/${type}/${IsMain}`;

export const GET_COLLECTION_LIST_BY_COLLECTION_ID = (CollectionID) => `${BASE_URL}/Artwork/GetCollectionContacts/${CollectionID}`;

export const GET_DRAFT_ORDER_LIST = (CollectionID) => `${BASE_URL}/Order/GetCollectionDraftOrders/${CollectionID}`;

export const GET_ORDER_LIST = (CollectionID) => `${BASE_URL}/Order/GetCollectionOrders/${CollectionID}`;

export const GET_COLLECTION_LIST_SAVED_BY_COLLECTION_ID = (CollectionID) => `${BASE_URL}/Artwork/GetCollectionSavedContacts/${CollectionID}`;

export const GET_CONTACT_LIST_BY_COLLECTION_ID = (CollectionID) => `${BASE_URL}/Artwork/GetContactListdata/${CollectionID}`;

export const GET_DARFT_ORDER_LIST_DATA_BY_COLLECTION_ID = (CollectionID) => `${BASE_URL}/Order/GetDraftOrderListData/${CollectionID}`;

export const GET_ORDER_LIST_DATA_BY_COLLECTION_ID = (CollectionID) => `${BASE_URL}/Order/GetOrderListData/${CollectionID}`;

export const TOGGLE_SAVE_CONTACT = (CollectionID) => `${BASE_URL}/Artwork/ToggleSaveContactInCollection/${CollectionID}`;

export const REMOVE_DRAFT_ORDER = (CollectionID, DraftID) => `${BASE_URL}/Order/DeleteDraftOrder/${CollectionID}/${DraftID}`;

export const SEARCH_CONTACT_FOR_ADD_IN_COLLECTION = (CollectionID, Search) => `${BASE_URL}/Artwork/SearchContactForAddInCollection/${CollectionID}/${Search}`;

export const PUBLISHING_CV_EXHIBITIONS = `${BASE_URL}/CvBuilder/PublishCvBuilderSelectedExhibition`;

export const PUBLISHING_CV_PROFESENAL = `${BASE_URL}/CvBuilder/PublishCvBuilderProfessionamAppointment`;

export const PUBLISHING_CV_GRANTANDAWARDL = `${BASE_URL}/CvBuilder/PublishCvBuilderGrantAndAward`;

export const PUBLISHING_CV_BIOGRAPHY = `${BASE_URL}/CvBuilder/PublishCvBuilderBio`;

export const PUBLISHING_CV_COMMISION = `${BASE_URL}/CvBuilder/PublishCvBuilderCommision`;

export const PUBLISHING_CV_PUBLICATIONS = `${BASE_URL}/CvBuilder/PublishCvBuilderPublication`;

export const PUBLISHING_CV_PROFESSIONALSERVICE = `${BASE_URL}/CvBuilder/PublishCvBuilderProfessionalService`;

export const PUBLISHING_CV_PROFESSIONAL_ORGANIZATION = `${BASE_URL}/CvBuilder/PublishCvBuilderProfessionalOrganization`;

export const GET_USER_INFO_FOR_ADD_CONTACT = (UserID) => `${BASE_URL}/Artwork/GetUserDataForAdd/${UserID}`;

export const GET_CONTACT_ADD_INPUT_DATA = (CollectionID) => `${BASE_URL}/Artwork/GetAddContactData/${CollectionID}`;

export const ADD_CONTACT = (CollectionID) => `${BASE_URL}/Artwork/AddContact/${CollectionID}`;

// mrx : edit email ist contact 
export const EDIT_EMAIL_LIST_CONTACT = (CollectionID) => `${BASE_URL}/Artwork/EditContactEmailList/${CollectionID}`;

// for getting user email list
export const GET_USER_EMAIL_LIST = `${BASE_URL}/User/GetUserAllEmailList`;

// mrx : add new address contact
export const ADD_NEW_ADDRESS = (CollectionID) => `${BASE_URL}/Artwork/AddContactDefaultAddress/${CollectionID}`;

// Add New tag in contact 
export const ADD_NEW_TAG_CONTACT = (CollectionID) => `${BASE_URL}/Artwork/ChangeContactCollectionTags/${CollectionID}`;

// mrx : search in tags
export const SEARCH_IN_CONTACT_TAGS = (CollectionID, Search) => `${BASE_URL}/Artwork/SearchTagInCollectionForContact/${CollectionID}/${Search}`;

// mrx: edit tax in contact
export const EDIT_CONTACT_TAX = (contactID, CollectionID) => `${BASE_URL}/Artwork/ToggleTaxContactInCollection/${contactID}/${CollectionID}`;

// mrx: delete addrress  contact
export const DELETE_ADDRESS_CONTACT = (ContactID, AddressID, CollectionID) => `${BASE_URL}/Artwork/DeleteContactDefaultAddress/${ContactID}/${AddressID}/${CollectionID}`;

// create stripe session
export const CREATE_SESSION = `${BASE_SSR_URL}/user/create-verification-session`;

// sa: get all notifications
export const GET_NOTIFICATIONS_URL = (CollectionID) => `${BASE_URL}/Notification/GetNotifications/${getCollectionId()}`;
// sa: make notification  seen
export const MAKE_NOTIFICATION_SEEN_URL = (notificationId) => `${BASE_URL}/Notification/MakeNotificationSeen/${notificationId}`;

// search contact for order list 
export const SEARCH_CONTACT_DARFT_ORDER = (Search) => `${BASE_URL}/Artwork/SearchContactForOrder/${getCollectionId()}/${Search}`;

// mrx : start order
export const START_NEW_ORDER = `${BASE_URL}/Order/StartNewOrder/${getCollectionId()}`;

// mrx : toggle paied order
export const TOGGLE_Paied = (OrderID) => `${BASE_URL}/Order/ToggleChangePaidStatus/${getCollectionId()}/${OrderID}`;

export const DELETE_ITEM_ORDER = (OrderID) => `${BASE_URL}/Order/DeleteOrderItem/${getCollectionId()}/${OrderID}`;

// mrx : add order 
export const ADD_CUSTOMER_TO_ORDER = (OrderID, CustomerID) => `${BASE_URL}/Order/AddCustomerToOrder/${getCollectionId()}/${OrderID}/${CustomerID}`;

// sa: create email list
export const CREATE_EMAIL_LIST = (titleName) => `${BASE_URL}/User/AddUserEmailList/${titleName}`;

// sa: edit email list
export const Edit_EMAIL_LIST = (emailListId, newTitleName) => `${BASE_URL}/User/UpdateUserEmailList/${emailListId}/${newTitleName}`;

// sa: edit email list
export const Remove_EMAIL_LIST = (emailListId) => `${BASE_URL}/User/DeleteUserEmailList/${emailListId}`;

// sa: edit email list item
export const Remove_EMAIL_LIST_Item = (emailListItemId) => `${BASE_URL}/User/DeleteUserEmailListItem/${emailListItemId}`;

// sa: add user email list item
export const Add_User_Email_List_Item = () => `${BASE_URL}/User/AddUserEmailListItem`;

// sa: edit user email list item
export const Edit_User_Email_List_Item = () => `${BASE_URL}/User/UpdateUserEmailListItem`;

// sa: get add draft order data
export const Get_Add_Draft_Order_Data = (collectionId) => `${BASE_URL}/Order/GetAddDraftOrderData/${collectionId}`;

export const Get_Order_Data = (orderID) => `${BASE_URL}/Order/GetDraftOrder/${getCollectionId()}/${orderID}`;

// sa: create/edit order draft discount
export const Create_Update_Draft_Order_Discount = (orderId, collectionId) => `${BASE_URL}/Order/AddDiscountToOrder/${orderId}/${collectionId}`;

// sa: create/edit order draft shipment
export const Create_Update_Draft_Order_Shipment = (orderId, collectionId) => `${BASE_URL}/Order/AddShipmentToOrder/${orderId}/${collectionId}`;

// sa: create/edit order draft tax
export const Create_Update_Draft_Order_Tax = (orderId, collectionId) => `${BASE_URL}/Order/AddTaxToToOrder/${orderId}/${collectionId}`;

// sa: create order Item
export const Create_Order_Item = (orderId, collectionId) => `${BASE_URL}/Order/AddCustomItemToOrder/${orderId}/${collectionId}`;

export const GET_MODAL_DATA = `${BASE_URL}/artwork/GetItemsInAddArtworkModal/${getCollectionId()}`;

export const ADD_ARTWORK_TO_ORDER = (orderId) => `${BASE_URL}/Order/AddArtworkToOrder/${orderId}/${getCollectionId()}`;
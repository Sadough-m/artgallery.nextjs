import react, { createContext, useState } from 'react';
import { uuid } from 'uuidv4';

export const Context = createContext({
    setRemoveEditons: false,
    RemoveEditons: false,
    UpdateMediaLimited: false,
    setUpdateMediaLimited: false,
    Publishing: false,
    setPublishing: false,
    ISAllformsOK: true,
    setISAllformsOK: true,
    saved: false,
    setSaved: false,
    setShowenReproduction: false,
    ShowenReproduction: false,
    setClassificationID: 0,
    ClassificationID: 0,
    SelectedTypeID: 0,
    setSelectedTypeID: 0,
    ArtistList: [],
    setArtistList: [],
    CollectionID: "",
    setCollectionID: "",
    setAllEditionsChanges: [],
    AllEditionsChanges: [],
    setMintingStatus: 0,
    MintingStatus: 0,
    setAllMediaLimitedC: [],
    AllMediaLimitedC: [],
    AllMesurmentsData: [],
    setAllMesurmentsData: [],
    RootMedumeType: 0,
    setRootMedumeType: 0,
    ArrayList: [],
    setArrayList: [],
    // adding artwork global states

    // --- general section states Start ----
    GeneralFiilled: false,
    setGeneralFiilled: false,
    AddedArtistList: "",
    setAddedArtistList: "",
    GeneralTitle: "",
    setGeneralTitle: "",
    GeneralCreationyear: "",
    setGeneralCreationyear: "",
    GeneralDescription: "",
    OpenMintingAfterModal: false,
    setOpenMintingAfterModal: false,
    setGeneralDescription: "",
    // --- general section states End ----

    // --- media section states Start ----
    HaveMedia: false,
    setHaveMedia: false,
    UploadingFileMedia: [],
    setUploadingFileMedia: [],
    // --- media section states End ----

    // --- proof section states Start ----
    ProofSectionData: [],
    setProofSectionData: [],
    // --- proof section states End ----

    // --- Edition section states Start ----
    AllEditions: [],
    setAllEditions: [],
    // --- Edition section states End ----

    // --- Reproduction section states Start ----
    ReproductionSectionData: [],
    setReproductionSectionData: [],
    OriginalSectionData: [],
    setOriginalSectionData: [],
    // --- proof section states End ----

    // --- Privacy section states Start ----
    OwnershipID: 0,
    setOwnershipID: 0,
    PriceID: 0,
    setPriceID: 0,
    TrandferDateID: 0,
    setTrandferDateID: 0,
    TransferTypeID: 0,
    setTransferTypeID: 0,
    EdDataEdited: false,
    setEdDataEdited: false,
    SEDataEdited: false,
    setSEDataEdited: false,
    COlDataEdited: false,
    setCOlDataEdited: false,
    BGDataEdited: false,
    setBGDataEdited: false,
    PAataEdited: false,
    setPAataEdited: false,
    GAAataEdited: false,
    setGAAataEdited: false,
    CommiataEdited: false,
    setCommiataEdited: false,
    PubiataEdited: false,
    setPubiataEdited: false,
    ReproiataEdited: false,
    setReproiataEdited: false,
    PSiataEdited: false,
    setPSiataEdited: false,
    POiataEdited: false,
    setPOiataEdited: false,
    setDataEdited: false,
    DataEdited: false,
    // --- Privacy section states End ----


    // --- common section states Start ----
    setHaveDefultArtist: false,
    HaveDefultArtist: false,
    ShowSettingUser: false,
    setShowSettingUser: false,
    setSignleItemId: "",
    SignleItemId: "",
    collectionItem: "",
    setCollectionItem: "",
    sameMedia: false,
    setSameMedia: false,
    userAddress: "",
    setUserAddress: "",
    setLoadingPage: false,
    LoadingPage: false,
    // --- common section states End ----



    setEducationEditData: [],
    EducationEditData: [],
    SelectedExhibitionsEditData: [],
    setSelectedExhibitionsEditData: [],
    CollectionsEditData: [],
    setCollectionsEditData: [],
    BilbiographyEditData: [],
    setBilbiographyEditData: [],
    ProfessionalAppointmentsEditData: [],
    setProfessionalAppointmentsEditData: [],
    GrantsAndAwardsEditData: [],
    setGrantsAndAwardsEditData: [],
    CommissionsEditData: [],
    setCommissionsEditData: [],
    PublicationsEditData: [],
    setPublicationsEditData: [],
    RepresentationEditData: [],
    setRepresentationEditData: [],
    ProfessionalServiceEditData: [],
    setProfessionalServiceEditData: [],
    ProfessionalOrganizationsEditData: [],
    setProfessionalOrganizationsEditData: [],
    ShowDisOrSaveLimited: false,
    setShowDisOrSaveLimited: false,
    setNewEditions: [],
    NewEditions: [],
    StatuseID: 0,
    setStatuseID: 0,
    AvailibilityID: 0,
    setAvailibilityID: 0,
    TokenUser: "",
    setTokenUser: "",
});

const ContextProvider = (props) => {
    const [TokenUser, setTokenUser] = useState("");
    const [NewEditions, setNewEditions] = useState([]);
    const [UpdateMediaLimited, setUpdateMediaLimited] = useState(false);
    const [ShowDisOrSaveLimited, setShowDisOrSaveLimited] = useState(false);
    const [ReproductionSectionData, setReproductionSectionData] = useState([]);
    const [Publishing, setPublishing] = useState(false);
    const [OriginalSectionData, setOriginalSectionData] = useState([]);
    const [AllEditionsChanges, setAllEditionsChanges] = useState([]);
    const [ArtistList, setArtistList] = useState([]);
    const [saved, setSaved] = useState(false);
    const [ISAllformsOK, setISAllformsOK] = useState(true);
    const [ShowenReproduction, setShowenReproduction] = useState(false);
    const [ClassificationID, setClassificationID] = useState(0);
    const [CollectionID, setCollectionID] = useState("");
    const [SelectedTypeID, setSelectedTypeID] = useState(0);
    const [ModalCollectioMenu, setModalCollectioMenu] = useState(false);
    const [MintingStatus, setMintingStatus] = useState(0);
    const [AllMediaLimitedC, setAllMediaLimitedC] = useState([]);
    const [AllMesurmentsData, setAllMesurmentsData] = useState([]);
    const [LoadingPage, setLoadingPage] = useState(false);
    const [EdDataEdited, setEdDataEdited] = useState(false);
    const [SEDataEdited, setSEDataEdited] = useState(false);
    const [COlDataEdited, setCOlDataEdited] = useState(false);
    const [BGDataEdited, setBGDataEdited] = useState(false);
    const [PAataEdited, setPAataEdited] = useState(false);
    const [GAAataEdited, setGAAataEdited] = useState(false);
    const [CommiataEdited, setCommiataEdited] = useState(false);
    const [PubiataEdited, setPubiataEdited] = useState(false);
    const [ReproiataEdited, setReproiataEdited] = useState(false);
    const [PSiataEdited, setPSiataEdited] = useState(false);
    const [POiataEdited, setPOiataEdited] = useState(false);
    const [DataEdited, setDataEdited] = useState(false);

    const [RootMedumeType, setRootMedumeType] = useState(0);
    const [OpenMintingAfterModal, setOpenMintingAfterModal] = useState(false);
    const [HideHeader, setHideHeader] = useState(false)
    const [ArrayList, setArrayList] = useState([]);

    // adding artwork global states
    const [GeneralFiilled, setGeneralFiilled] = useState(false);

    // --- general section states Start ----
    const [AddedArtistList, setAddedArtistList] = useState([]);
    const [GeneralTitle, setGeneralTitle] = useState("");
    const [GeneralCreationyear, setGeneralCreationyear] = useState("");
    const [GeneralDescription, setGeneralDescription] = useState("");
    // --- general section states End ----

    // --- media section states Start ----
    const [HaveMedia, setHaveMedia] = useState(false);
    const [UploadingFileMedia, setUploadingFileMedia] = useState([]);
    // --- media section states End ----

    // --- proof section states Start ----
    const [ProofSectionData, setProofSectionData] = useState([]);
    // --- proof section states End ----

    const [DashboardOpen, setDashboardOpen] = useState(true)

    // --- common section states Start ----
    const [HaveDefultArtist, setHaveDefultArtist] = useState(false);
    const [ShowSettingUser, setShowSettingUser] = useState(false);
    const [SignleItemId, setSignleItemId] = useState("");
    const [collectionItem, setCollectionItem] = useState("");
    const [sameMedia, setSameMedia] = useState(false);
    // --- common section states End ----

    // --- Privacy section states Start ----
    const [OwnershipID, setOwnershipID] = useState(0);
    const [PriceID, setPriceID] = useState(0);
    const [TrandferDateID, setTrandferDateID] = useState(0);
    const [TransferTypeID, setTransferTypeID] = useState(0);
    // --- Privacy section states End ----

    // --- Edition section states Start ----
    const [AllEditions, setAllEditions] = useState(false);
    // --- Edition section states End ----

    // --- MetaMax section states Start ----
    const [userAddress, setUserAddress] = useState("");
    // --- MetaMax section states End ----

    // --- Edit All step 2 section states Start ----
    const [EducationEditData, setEducationEditData] = useState([]);
    const [SelectedExhibitionsEditData, setSelectedExhibitionsEditData] = useState([]);
    const [CollectionsEditData, setCollectionsEditData] = useState([]);
    const [BilbiographyEditData, setBilbiographyEditData] = useState([]);
    const [ProfessionalAppointmentsEditData, setProfessionalAppointmentsEditData] = useState([]);
    const [GrantsAndAwardsEditData, setGrantsAndAwardsEditData] = useState([]);
    const [CommissionsEditData, setCommissionsEditData] = useState([]);
    const [PublicationsEditData, setPublicationsEditData] = useState([]);
    const [RepresentationEditData, setRepresentationEditData] = useState([]);
    const [ProfessionalServiceEditData, setProfessionalServiceEditData] = useState([]);
    const [ProfessionalOrganizationsEditData, setProfessionalOrganizationsEditData] = useState([]);
    const [AvailibilityID, setAvailibilityID] = useState(0);
    const [StatuseID, setStatuseID] = useState(0);
    const [RemoveEditons, setRemoveEditons] = useState(false);
    // --- Edit All step 2 section states End ----

    return (
        <Context.Provider
            value={{
                TokenUser,
                setTokenUser,
                setRemoveEditons,
                RemoveEditons,
                AvailibilityID,
                setAvailibilityID,
                StatuseID,
                setStatuseID,
                setNewEditions,
                NewEditions,
                UpdateMediaLimited,
                setUpdateMediaLimited,
                ArrayList,
                setArrayList,
                ShowDisOrSaveLimited,
                setShowDisOrSaveLimited,
                setPublishing,
                Publishing,
                LoadingPage,
                setLoadingPage,
                UploadingFileMedia,
                setUploadingFileMedia,
                setAllEditionsChanges,
                AllEditionsChanges,
                setRootMedumeType,
                RootMedumeType,
                CollectionID,
                setCollectionID,
                OpenMintingAfterModal,
                setOpenMintingAfterModal,
                saved,
                setSaved,
                ArtistList,
                setArtistList,
                ClassificationID,
                setClassificationID,
                setShowenReproduction,
                ShowenReproduction,
                ISAllformsOK,
                setISAllformsOK,
                SelectedTypeID,
                setSelectedTypeID,
                ModalCollectioMenu,
                setModalCollectioMenu,
                setMintingStatus,
                MintingStatus,
                setAllMediaLimitedC,
                AllMediaLimitedC,
                AllMesurmentsData,
                setAllMesurmentsData,
                EdDataEdited,
                setEdDataEdited,
                SEDataEdited,
                setSEDataEdited,
                COlDataEdited,
                setCOlDataEdited,
                BGDataEdited,
                setBGDataEdited,
                PAataEdited,
                setPAataEdited,
                GAAataEdited,
                setGAAataEdited,
                CommiataEdited,
                setCommiataEdited,
                PubiataEdited,
                setPubiataEdited,
                ReproiataEdited,
                setReproiataEdited,
                PSiataEdited,
                setPSiataEdited,
                POiataEdited,
                setDataEdited,
                DataEdited,
                setPOiataEdited,
                // adding artwork global states
                setGeneralFiilled,

                // --- general section states Start ----
                GeneralFiilled,
                AddedArtistList,
                setAddedArtistList,
                GeneralTitle,
                setGeneralTitle,
                GeneralCreationyear,
                setGeneralCreationyear,
                GeneralDescription,
                setGeneralDescription,
                // --- general section states End ----

                // --- Dashboard ----
                DashboardOpen,
                setDashboardOpen,
                // --- Dashboard ----

                // --- media section states Start ----
                HaveMedia,
                setHaveMedia,
                // --- media section states End ----

                // --- proof section states Start ----
                ProofSectionData,
                setProofSectionData,
                // --- proof section states End ----

                // --- COMMON section states Start ----
                HaveDefultArtist,
                setHaveDefultArtist,
                ShowSettingUser,
                setShowSettingUser,
                setSignleItemId,
                SignleItemId,
                collectionItem,
                setCollectionItem,
                sameMedia,
                setSameMedia,
                // --- COMMON section states End ----

                // --- Reproduction section states Start ----
                ReproductionSectionData,
                setReproductionSectionData,
                OriginalSectionData,
                setOriginalSectionData,
                // --- Reproduction section states End ----

                // --- Privacy section states Start ----
                OwnershipID,
                setOwnershipID,
                PriceID,
                setPriceID,
                TrandferDateID,
                setTrandferDateID,
                TransferTypeID,
                setTransferTypeID,
                // --- Privacy section states End ----

                // --- Edition section states Start ----
                AllEditions,
                setAllEditions,
                // --- Edition section states End ----

                // --- MetaMax section states Start ----
                userAddress,
                setUserAddress,
                // --- MetaMax section states End ----



                setEducationEditData,
                EducationEditData,
                SelectedExhibitionsEditData,
                setSelectedExhibitionsEditData,
                CollectionsEditData,
                setCollectionsEditData,
                BilbiographyEditData,
                setBilbiographyEditData,
                ProfessionalAppointmentsEditData,
                setProfessionalAppointmentsEditData,
                GrantsAndAwardsEditData,
                setGrantsAndAwardsEditData,
                CommissionsEditData,
                setCommissionsEditData,
                PublicationsEditData,
                setPublicationsEditData,
                RepresentationEditData,
                setRepresentationEditData,
                ProfessionalServiceEditData,
                setProfessionalServiceEditData,
                ProfessionalOrganizationsEditData,
                setProfessionalOrganizationsEditData,


                HideHeader,
                setHideHeader
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
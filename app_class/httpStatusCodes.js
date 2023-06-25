
// to learn more about use this link : https://restfulapi.net/http-status-codes/

module.exports = {
    ok_200 : async (res , returnData) => res.status(200).send(returnData),
    created_201 : async (res , returnData) => res.status(201).send(returnData),
    accepted_202 : async (res , returnData) => res.status(202).send(returnData),
    noContent_204 : async (res , returnData) => res.status(204).send(returnData),
    movedPermanently_301 : async (res , returnData) => res.status(301).send(returnData),
    found_302 : async (res , returnData) => res.status(302).send(returnData),
    seeOthers_303 : async (res , returnData) => res.status(303).send(returnData),
    notModified_304 : async (res , returnData) => res.status(304).send(returnData),
    temporaryRedirect_307 : async (res , returnData) => res.status(307).send(returnData),
    badRequest_400 : async (res , returnData) => res.status(400).send( ( typeof(returnData) == "array" ) ? await generateJoiBadRequestMessage(returnData) : returnData ),
    unauthorized_401 : async (res , returnData) => res.status(401).send(returnData),
    forbidden_403 : async (res , returnData) => res.status(403).send(returnData),
    notFound_404 : async (res , returnData) => res.status(404).send(returnData),
    methodNotAllow_405 : async (res , returnData) => res.status(405).send(returnData),
    notAcceptable_406 : async (res , returnData) => res.status(406).send(returnData),
    preconditionFailed_412 : async (res , returnData) => res.status(412).send(returnData),
    unsupportedMediaType_415 : async (res , returnData) => res.status(415).send(returnData),
    internalServerError_500 : async (res , returnData) => res.status(500).send(returnData),
    notImplemented_501 : async (res , returnData) => res.status(501).send(returnData),
}


generateJoiBadRequestMessage = async (JoiError) => JoiError.details.map((errorObject) => errorObject.message); 
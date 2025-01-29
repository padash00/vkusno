import { useUser } from "../contexts/UserContext"
import { CheckCircle, XCircle } from "lucide-react"

export default function PhoneVerificationStatus() {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="flex items-center mt-2">
      {user.phoneVerified ? (
        <>
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-green-500">Телефон подтвержден</span>
        </>
      ) : (
        <>
          <XCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-500">Телефон не подтвержден</span>
        </>
      )}
    </div>
  )
}


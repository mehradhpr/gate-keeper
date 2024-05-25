"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClientAccountInfo } from "@/interfaces/account-interface";
import { ScrollArea } from "@/components/ui/scroll-area"

const mockAccounts: ClientAccountInfo[] = [
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com", role: "User" },
  { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", role: "Admin" },
  { firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", role: "User" },
  { firstName: "Bob", lastName: "Brown", email: "bob.brown@example.com", role: "User" },
  { firstName: "Charlie", lastName: "Davis", email: "charlie.davis@example.com", role: "Manager" },
  { firstName: "Dana", lastName: "Evans", email: "dana.evans@example.com", role: "User" },
  { firstName: "Eve", lastName: "Foster", email: "eve.foster@example.com", role: "Admin" },
  { firstName: "Frank", lastName: "Green", email: "frank.green@example.com", role: "User" },
  { firstName: "Grace", lastName: "Harris", email: "grace.harris@example.com", role: "User" },
  { firstName: "Hank", lastName: "Iverson", email: "hank.iverson@example.com", role: "Manager" },
  { firstName: "Ivy", lastName: "Jones", email: "ivy.jones@example.com", role: "User" },
  { firstName: "Jack", lastName: "King", email: "jack.king@example.com", role: "User" },
  { firstName: "Karen", lastName: "Lee", email: "karen.lee@example.com", role: "Admin" },
  { firstName: "Leo", lastName: "Martin", email: "leo.martin@example.com", role: "User" },
  { firstName: "Mona", lastName: "Nelson", email: "mona.nelson@example.com", role: "User" },
  { firstName: "Nina", lastName: "Owen", email: "nina.owen@example.com", role: "User" },
  { firstName: "Oscar", lastName: "Perez", email: "oscar.perez@example.com", role: "Manager" },
  { firstName: "Pam", lastName: "Quinn", email: "pam.quinn@example.com", role: "User" },
  { firstName: "Quincy", lastName: "Roberts", email: "quincy.roberts@example.com", role: "User" },
  { firstName: "Rachel", lastName: "Stevens", email: "rachel.stevens@example.com", role: "Admin" },
  { firstName: "Sam", lastName: "Thompson", email: "sam.thompson@example.com", role: "User" },
  { firstName: "Tina", lastName: "Underwood", email: "tina.underwood@example.com", role: "User" },
  { firstName: "Uma", lastName: "Vance", email: "uma.vance@example.com", role: "User" },
  { firstName: "Victor", lastName: "White", email: "victor.white@example.com", role: "Manager" },
  { firstName: "Wendy", lastName: "Xavier", email: "wendy.xavier@example.com", role: "User" },
  { firstName: "Xander", lastName: "Young", email: "xander.young@example.com", role: "User" },
  { firstName: "Yara", lastName: "Zimmer", email: "yara.zimmer@example.com", role: "User" },
  { firstName: "Zane", lastName: "Adams", email: "zane.adams@example.com", role: "Admin" },
];

const Administration = () => {
  const [accounts, setAccounts] = useState<ClientAccountInfo[]>(mockAccounts);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<ClientAccountInfo | null>(mockAccounts[0]);

  const filteredAccounts = accounts.filter(
    (account) =>
      account.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccountSelect = (account: ClientAccountInfo) => {
    setSelectedAccount(account);
  };

  const handleAccountUpdate = () => {
    // Update account logic here
  };

  const handleAccountDelete = () => {
    // Delete account logic here
  };

  return (
    <div className="flex text-gray-100 p-8 -mt-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full">
        {/* Accounts List Card */}
        <Card className="p-6 bg-gray-800 text-gray-100 h-full overflow-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Search by first name, last name, or email"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-white placeholder-white"
            />
            <ScrollArea className="h-[calc(50vh)] rounded-md border p-4">
              <Table>
                <TableCaption>A list of all the accounts.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow
                      key={account.email}
                      className="cursor-pointer"
                      onClick={() => handleAccountSelect(account)}
                    >
                      <TableCell>{account.firstName}</TableCell>
                      <TableCell>{account.lastName}</TableCell>
                      <TableCell>{account.email}</TableCell>
                      <TableCell>{account.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

          </CardContent>
        </Card>

        {/* Account Details Card */}
        {selectedAccount && (
          <Card className="p-6 bg-gray-800 text-gray-100 h-full overflow-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input
                  type="text"
                  value={selectedAccount.firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedAccount({ ...selectedAccount, firstName: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input
                  type="text"
                  value={selectedAccount.lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedAccount({ ...selectedAccount, lastName: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={selectedAccount.email}
                  disabled
                  className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <Input
                  type="text"
                  value={selectedAccount.role}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedAccount({ ...selectedAccount, role: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
                />
              </div>
              <Button
                onClick={handleAccountUpdate}
                className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-md text-gray-100"
              >
                Update Account
              </Button>
              <div className="w-full border-t border-gray-600 my-4"></div>
              <Button
                onClick={handleAccountDelete}
                className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md text-gray-100"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Administration;

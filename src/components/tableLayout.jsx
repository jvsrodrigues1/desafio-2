import React, { useState, useEffect } from "react";
import AddEntryButton from "./addEntryButton";
import AddEntryForm from "./addEntryForm";
import DataTable from "./dataTable";

function LayoutTable() {
  const [layoutData, setLayoutData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    fetchLayoutData();
  }, []);

  const fetchLayoutData = async () => {
    try {
      const response = await fetch(
        "https://apifgts.temsaque.com.br/api/layout"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch layout data");
      }
      const data = await response.json();
      setLayoutData(data.data || []);
    } catch (error) {
      console.error("Error fetching layout data:", error.message);
    }
  };

  const handleAddNewEntry = () => {
    setSelectedEntry(null);
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setShowForm(true);
  };

  const handleDeleteEntry = async (entry) => {
    try {
      const response = await fetch(
        `https://apifgts.temsaque.com.br/api/layout/${entry.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }
      fetchLayoutData();
    } catch (error) {
      console.error("Error deleting entry:", error.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const correctedFormData = {
        nome: formData.name,
        tipo: formData.type,
      };

      let url = "https://apifgts.temsaque.com.br/api/layout";
      let method = "POST";

      if (selectedEntry) {
        url += `/${selectedEntry.id}`;
        method = "POST";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(correctedFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to add/update entry");
      }

      setSelectedEntry(null);
      setShowForm(false);
      fetchLayoutData();
    } catch (error) {
      console.error("Error adding/updating entry:", error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-8 xs:w-[100%] sm:w-[155%]">
        <div className="flex flex-col items-center">
          <div>
            <AddEntryButton onClick={handleAddNewEntry} />
          </div>
          {showForm && (
            <div>
              <AddEntryForm
                onSubmit={handleFormSubmit}
                initialData={selectedEntry}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 px-4">
        <DataTable
          data={layoutData}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
        />
      </div>
    </>
  );
}

export default LayoutTable;
